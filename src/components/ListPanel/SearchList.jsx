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
import { reportContent } from '../../utilities/analytics';
import ResultDialog from '../ResultDialog';
import PaginationBar from './PaginationBar';
import PlaceHolderImage from './PlaceHolder.svg';
import PlusIcon from './PlusIcon.svg';
import EllipseIcon from './Ellipse.svg';
import DownCaret from './DownCaret.svg';
import MagnifyingGlass from './MagnifyingGlass.svg';

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
    padding: '4px',
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

                <TableCell component="th" scope="row" style={{ border: 'none' }} className={classes.tableHeader}>

                  <Grid container direction="row" style={{ padding: '1em', boxShadow: '2px 2px 4px rgba(131,131,131,0.25)' }}>
                    <Grid item xs={2}>
                      <img alt="A generic table" src={PlaceHolderImage} style={{ width: '14em' }} />
                      <img alt="A magnifying glass" src={MagnifyingGlass} style={{ transform: 'translate(110px, -50px)' }} />
                    </Grid>
                    <Grid item xs={8}>
                      {createTitleSection(content.title, content)}
                      <Typography variant="body2">
                        <span>{intl.formatMessage({ id: 'common.fullProjectName' })}</span>
                        {content.application.name}
                      </Typography>
                      <Typography variant="body2">
                        <span>{intl.formatMessage({ id: 'common.companyName' })}</span>
                        Placeholder
                      </Typography>

                      <ButtonBase
                        className={classes.seeMoreButton}
                        style={{ paddingLeft: 0, marginTop: '1em' }}
                        onClick={() => {}}
                      >
                        View more details...
                        <img alt="Down caret" src={DownCaret} />

                      </ButtonBase>
                    </Grid>
                    <Grid container item direction="column" alignItems="flex-end" justify="space-around" xs={2}>
                      <Grid container item direction="row" justify="space-between" alignItems="center" style={{ backgroundColor: '#D2EDEB', borderRadius: '5px', width: '100%', padding: '0 1em ' }}>

                        <Grid item>
                          <img alt="A plus icon" src={PlusIcon} style={{}} />
                        </Grid>
                        <Grid item>
                          <p>
                            Add to shelf
                          </p>
                        </Grid>

                      </Grid>

                      <Grid item>
                        <img alt="Ellipse" src={EllipseIcon} />
                      </Grid>
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
