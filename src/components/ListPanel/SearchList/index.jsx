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

import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import { reportContent } from '../../../utilities/analytics';
import ResultDialog from '../../ResultDialog';
import PaginationBar from '../PaginationBar';
import PlaceHolderImage from '../../../images/ListPanel/PlaceHolder.svg';
import EllipseIcon from '../../../images/ListPanel/Ellipse.svg';
import DownCaret from '../../../images/ListPanel/DownCaret.svg';
import MagnifyingGlass from '../../../images/ListPanel/MagnifyingGlass.svg';
import ShelfButton from '../ShelfButton';

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    padding: '0.4em 0.4em 0.4em 0',
    '& p:first-of-type': {
      marginTop: '1em',
    },
    '& p': {
      marginTop: '5px',
      borderRadius: '5px',
    },
    '& span': {
      fontWeight: '900',
    },
    '& h6': {
      textTransform: 'uppercase',
      fontWeight: 'normal',
      color: '#434343',
      display: 'inline',
      cursor: 'pointer',
    },
    '& .tableCellInner': {
      padding: '1em 1em 1em 0',
      boxShadow: '2px 2px 4px rgba(131,131,131,0.25)',
      '& img': {
        cursor: 'pointer',
      },
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
  viewMoreDetails: {
    color: theme.palette.blue.dark,
    fontWeight: 'bold',
    marginTop: '1em',
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
                  <Grid className="tableCellInner" container>
                    <Grid item xs={2} onClick={() => handleClickOpen(content)}>
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
                        {/* TODO: this data needs to come in from the application query */}
                        Placeholder Lorem ipsum dolor sit.
                      </Typography>

                      <ButtonBase className={classes.viewMoreDetails}>
                        View more details...
                        <img alt="Down caret" src={DownCaret} />
                      </ButtonBase>
                    </Grid>

                    <Grid container item direction="column" alignItems="flex-end" justify="space-around" xs={2}>
                      <ShelfButton />
                      <Grid item style={{ paddingRight: '1em' }}>
                        <ButtonBase>
                          <img alt="Ellipse" src={EllipseIcon} />
                        </ButtonBase>
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
