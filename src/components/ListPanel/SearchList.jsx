import { Grid, Typography, ButtonBase } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import figureIcon from '../../images/figure.svg';
import tableIcon from '../../images/table.svg';
import { reportContent } from '../../utilities/analytics';
import ResultDialog from '../ResultDialog';
import PaginationBar from './PaginationBar';

const useStyles = makeStyles((theme) => ({
  imgSection: {
    textAlign: 'right',
    '& p': {
      margin: 'auto',
      padding: '2px 6px',
      display: 'block',
      textTransform: 'uppercase',
      width: 'max-content',
      backgroundColor: theme.palette.teal.light,
      fontWeight: '900',
      fontSize: '10px',
      clear: 'right',
    },
    '& img': {
      display: 'block',
      margin: 'auto',
      height: '2.5em',
    },
    '& button': {
      display: 'block',
    },
  },
  tableHeader: {
    borderBottom: '1px solid black',
    '& p': {
      marginTop: '5px',
      borderRadius: '5px',
    },
    '& span': {
      fontWeight: '900',
    },
    '& h6': {
      textTransform: 'uppercase',
      textDecoration: 'underline',
      fontWeight: 'normal',
      color: '#434343',
      display: 'inline',
      cursor: 'pointer',
    },
  },
  tableParent: {
    boxShadow: 'none',
  },
  pagination: {
    '& .MuiTablePagination-caption': {
      display: 'none',
    },
  },
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
    paddingLeft: '1em',
  },
}));

const SearchList = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { config } = useConfig();
  const { contents, totalCount } = useESAData();
  const pageNumber = useMemo(
    () => (totalCount ? config.searchIndex : 0),
    [totalCount, config.searchIndex],
  );

  const [open, setOpen] = useState(false);
  const [selectedLineData, setSelectedLineData] = useState(null);
  const [expandedTitles, setExpandedTitles] = useState([]);

  const handleClickOpen = (content) => {
    reportContent(content.title);
    setOpen(true);
    setSelectedLineData(content);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO: make this a more generic function to be used whenever a see more button is needed.
  const createTitleSection = (title, content) => {
    if (title.length < 150) {
      return (
        <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
          {title}
        </Typography>
      );
    }

    if (title.length >= 150 && expandedTitles.find((entry) => entry === title)) {
      return (
        <>
          <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
            {title}
          </Typography>
          <ButtonBase
            className={classes.seeMoreButton}
            onClick={() => setExpandedTitles((list) => [...list.filter((item) => item !== title)])}
          >
            {intl.formatMessage({ id: 'components.resultDialog.seeLess' })}
          </ButtonBase>
        </>
      );
    }
    return (
      <>
        <Typography variant="h6" style={{ display: 'inline' }} onClick={() => handleClickOpen(content)}>
          {title.substring(0, 150).concat('...')}
        </Typography>
        <ButtonBase
          className={classes.seeMoreButton}
          onClick={() => setExpandedTitles((list) => [...list, title])}
        >
          {intl.formatMessage({ id: 'components.resultDialog.seeMore' })}
        </ButtonBase>
      </>
    );
  };

  return (
    <>
      <ResultDialog open={open} onClose={handleClose} data={selectedLineData} />

      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell component="th" scope="row" className={classes.tableHeader}>
                  <Grid container>

                    <Grid item xs={11}>
                      {createTitleSection(content.title, content)}
                      <Typography variant="body2">
                        <span>{intl.formatMessage({ id: 'common.fullProjectName' })}</span>
                        {content.application.name}
                      </Typography>
                      <Typography variant="body2">
                        <span>{`${intl.formatMessage({ id: 'components.resultsList.titles.filedDate' })}: `}</span>
                        {content.application.filingDate.substring(0, 10)}
                      </Typography>
                      <Typography variant="body2">
                        <span>{intl.formatMessage({ id: 'common.consultants' })}</span>
                        {content.application.consultants}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={1}
                      className={classes.imgSection}
                    >
                      <ButtonBase onClick={() => handleClickOpen(content)}>
                        <img
                          src={content.type === 'FIGURE' ? figureIcon : tableIcon}
                          alt={content.type === 'FIGURE' ? 'figure icon' : 'table icon'}
                        />
                        <Typography variant="caption" component="p">
                          {content.type === 'FIGURE' ? intl.formatMessage({ id: 'common.content.FIGURE' }) : intl.formatMessage({ id: 'common.content.TABLE' })}
                        </Typography>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationBar
        count={totalCount}
        page={pageNumber}
      />
    </>
  );
};
export default SearchList;
