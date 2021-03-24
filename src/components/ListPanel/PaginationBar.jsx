/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/*
  These eslint disables are for the way the WET template
  uses the anchor tag as a button and not a link or nav
*/
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { RESULT_COUNT } from '../../constants';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const PaginationBar = ({ count, page }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const pageCount = Math.ceil(count / RESULT_COUNT);

  const handlePageSelect = useCallback((pageIndex) => {
    configDispatch({ type: 'searchIndex/changed', payload: pageIndex });
  }, [configDispatch]);

  const createHandlePageSelect = (pageIndex) => () => handlePageSelect(pageIndex);

  return count !== 0 && (
    <Grid container justify="center" className={classes.root}>

      <Grid item>
        {/* TODO: Make a list item component to reduce repetition */}
        <ul className="pagination">

          {page > 0 && (
          <li>
            <a onClick={createHandlePageSelect(page - 1)} rel="prev">{intl.formatMessage({ id: 'common.previous' })}</a>
          </li>
          )}

          {(page + 5 >= 8) && (
          <li>
            <a onClick={createHandlePageSelect(0)}>{1}</a>
          </li>
          )}

          {(page - 4 >= 1) && (page === pageCount - 1) && (
          <li>
            <a onClick={createHandlePageSelect(page - 5)}>{page - 4}</a>
          </li>
          )}

          {(page - 3 >= 1) && (page >= pageCount - 2) && (
          <li>
            <a onClick={createHandlePageSelect(page - 4)}>{page - 3}</a>
          </li>
          )}

          {(page - 2 >= 1) && (page >= pageCount - 3) && (
          <li>
            <a onClick={createHandlePageSelect(page - 3)}>{page - 2}</a>
          </li>
          )}

          {(page - 1 >= 1) && (
          <li>
            <a onClick={createHandlePageSelect(page - 2)}>{page - 1}</a>
          </li>
          )}

          {(page >= 1) && (
          <li>
            <a onClick={createHandlePageSelect(page - 1)}>{page}</a>
          </li>
          )}

          <li className="active">
            <a>{page + 1}</a>
          </li>

          {(page + 2 < pageCount) && (
          <li>
            <a onClick={createHandlePageSelect(page + 1)}>{page + 2}</a>
          </li>
          )}

          {(page + 3 < pageCount) && (
          <li>
            <a onClick={createHandlePageSelect(page + 2)}>{page + 3}</a>
          </li>
          )}

          {(page + 4 < pageCount) && (page < 3) && (
          <li>
            <a onClick={createHandlePageSelect(page + 3)}>{page + 4}</a>
          </li>
          )}

          {(page + 5 < pageCount) && (page < 2) && (
          <li>
            <a onClick={createHandlePageSelect(page + 4)}>{page + 5}</a>
          </li>
          )}

          {(page + 6 < pageCount) && (page === 0) && (
          <li>
            <a onClick={createHandlePageSelect(page + 5)}>{page + 6}</a>
          </li>
          )}

          {page + 1 < pageCount && (
          <>
            <li>
              <a onClick={createHandlePageSelect(pageCount - 1)}>
                {pageCount}
              </a>
            </li>

            <li>
              <a onClick={createHandlePageSelect(page + 1)} rel="next">{intl.formatMessage({ id: 'common.next' })}</a>
            </li>
          </>
          )}

        </ul>
      </Grid>
    </Grid>
  );
};

export default PaginationBar;

PaginationBar.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
