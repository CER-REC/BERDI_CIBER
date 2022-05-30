import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import PageItem from '../PageItem';
import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const PaginationBar = ({ count, page }) => {
  const classes = useStyles();
  const { config: { resultCount } } = useConfig();
  const pageCount = Math.ceil(count / resultCount);

  return count !== 0 && (
    <Grid container justify="center" className={classes.root}>

      <Grid item>
        <ul className="pagination" style={{ marginTop: 0 }}>
          {(page > 0) && <PageItem page={page} rel="prev" />}
          {(page >= 3) && <PageItem page={1} /> }
          {(page - 4 >= 1) && (page === pageCount - 1) && <PageItem page={page - 4} />}
          {(page - 3 >= 1) && (page >= pageCount - 2) && <PageItem page={page - 3} />}
          {(page - 2 >= 1) && (page >= pageCount - 3) && <PageItem page={page - 2} />}
          {(page - 1 >= 1) && <PageItem page={page - 1} />}
          {(page >= 1) && <PageItem page={page} />}
          <PageItem page={page + 1} active />
          {(page + 2 < pageCount) && <PageItem page={page + 2} />}
          {(page + 3 < pageCount) && <PageItem page={page + 3} />}
          {(page + 4 < pageCount) && (page < 3) && <PageItem page={page + 4} />}
          {(page + 5 < pageCount) && (page < 2) && <PageItem page={page + 5} />}
          {(page + 6 < pageCount) && (page === 0) && <PageItem page={page + 6} />}
          {(page + 1 < pageCount) && (
            <>
              <PageItem page={pageCount} />
              <PageItem page={page + 2} rel="next" />
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
