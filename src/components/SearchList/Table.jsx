/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Icon, Typography } from '@material-ui/core';

import { useIntl } from 'react-intl';
import tableIcon from '../../images/table.svg';
import figureIcon from '../../images/figure.svg';
// import figureIcon from '../../images/figure.svg';

import { RESULT_COUNT } from '../../constants';
import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    '& ul': {
      position: 'relative',
      left: '40%',
    },

  },
}));

const Pagination = ({ count, page, onChangePage }) => {
  const classes = useStyles1();
  const intl = useIntl();

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handlePageSelect = () => (pageIndex) => {
    onChangePage(null, pageIndex);
  };

  return (
    <div className={classes.root}>
      <ul className="pagination">
        {page > 0 && <li><a onClick={handleBackButtonClick} rel="prev">{intl.formatMessage({ id: 'common.previous' })}</a></li>}

        {(page + 5 >= 8) && (
        <li>
          <a onClick={handlePageSelect(0)}>{1}</a>
        </li>
        )}
        {(page - 1 >= 1) && (
        <li>
          <a onClick={handlePageSelect(page - 2)}>{page - 1}</a>
        </li>
        )}
        {(page >= 1) && (
        <li>
          <a onClick={handlePageSelect(page - 1)}>{page}</a>
        </li>
        )}
        <li className="active">
          <a>{page + 1}</a>
        </li>
        {(page + 2 < Math.ceil(count / RESULT_COUNT)) && (
        <li>
          <a onClick={handlePageSelect(page + 1)}>{page + 2}</a>
        </li>
        )}
        {(page + 3 < Math.ceil(count / RESULT_COUNT)) && (
        <li>
          <a onClick={handlePageSelect(page + 2)}>{page + 3}</a>
        </li>
        )}
        {page + 1 < Math.ceil(count / RESULT_COUNT) && (
        <>
          <li>
            <a onClick={handlePageSelect(Math.ceil(count / RESULT_COUNT))}>
              {Math.ceil(count / RESULT_COUNT)}
            </a>
          </li>
          <li><a onClick={handleNextButtonClick} rel="next">{intl.formatMessage({ id: 'common.next' })}</a></li>
        </>
        )}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  tableHeader: {
    borderBottom: '1px solid black',
    '& p': {
      marginTop: '5px',
    },
    '& span': {
      fontWeight: '900',
    },
    '& h6': {
      textTransform: 'uppercase',
      textDecoration: 'underline',
      fontWeight: 'normal',
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
  table: {
    minWidth: 500,
  },
});

const CustomPaginationActionsTable = () => {
  const classes = useStyles2();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const { contents, totalCount } = useESAData();
  const pageNumber = useMemo(
    () => (totalCount ? config.searchIndex : 0),
    [totalCount, config.searchIndex],
  );
  const handleChangePage = useCallback((event, number) => {
    configDispatch({ type: 'searchIndex/changed', payload: number });
  }, [configDispatch]);
  console.log(config);
  return (
    <>
      <TableContainer component={Paper} className={classes.tableParent}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>

                <TableCell component="th" scope="row" className={classes.tableHeader}>
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography variant="h6" style={{ display: 'inline' }}>
                        {content.title}
                      </Typography>
                    </Grid>
                    <Grid item container direction="column" spacing={0} xs={3} style={{ textAlign: 'right' }}>
                      <Grid item>
                        <Icon>
                          <img
                            style={{ height: '70%' }}
                            src={config.sort === 'FIGURE' ? figureIcon : tableIcon}
                            alt={config.sort === 'FIGURE' ? 'figure icon' : 'table icon'}
                          />
                        </Icon>

                      </Grid>

                      <Grid item>
                        <Typography variant="caption">{config.sort === 'FIGURE' ? intl.formatMessage({ id: 'common.figure' }) : intl.formatMessage({ id: 'common.table' })}</Typography>
                      </Grid>
                    </Grid>

                  </Grid>
                  <Typography variant="body2" style={{ marginTop: '20px' }}>
                    <span>{'Full Project Name: '}</span>
                    {content.application.name}
                  </Typography>

                  <Typography variant="body2">
                    <span>{'Project Filed Date: '}</span>
                    {content.application.filingDate.substring(0, 10)}
                  </Typography>

                  <Typography variant="body2">
                    <span>{'ESA Consultant(s): '}</span>
                    {content.application.consultants}
                  </Typography>

                  { content.url && <Typography variant="body1"><a href={content.url} target="_blank" rel="noreferrer">Download</a></Typography> }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <Pagination
        className={classes.pagination}
        rowsPerPageOptions={[]}
        colSpan={3}
        count={totalCount}
        rowsPerPage={RESULT_COUNT}
        page={pageNumber}
        onChangePage={handleChangePage}
      />
    </>
  );
};

export default CustomPaginationActionsTable;
