import React from 'react';
import { Grid, Switch, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import ExploreButton from './ExploreButton';
import Keywords from './Keywords';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: '1.5em',
  },
  sideBlock: {
    margin: 'auto',
    textAlign: 'right',
  },
  filterLabel: {
    display: 'inline-block',
    paddingRight: '0.5em',
    verticalAlign: 'middle',
  },
}));

const SearchPanel = ({ hasFilter, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Grid container className={`SearchPanel ${classes.root}`}>
      {
        !hasFilter && (
          <Grid item xs={12}>
            <Typography variant="h6">
              {intl.formatMessage({ id: 'components.searchPanel.searchLabel' })}
            </Typography>
          </Grid>
        )
      }
      <Grid item xs={9}>
        <SearchBar hasShrink={hasFilter} />
      </Grid>
      <Grid item xs={3} classes={{ root: classes.sideBlock }}>
        {
          hasFilter && (
            <>
              <Typography classes={{ root: classes.filterLabel }} variant="h6">
                {intl.formatMessage({ id: 'components.searchPanel.filterLabel' })}
              </Typography>
              <Switch color="default" onChange={onChange} />
            </>
          )
        }
        { !hasFilter && <ExploreButton /> }
      </Grid>
      { !hasFilter && <Keywords /> }
    </Grid>
  );
};

SearchPanel.propTypes = {
  hasFilter: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

SearchPanel.defaultProps = {
  onChange: () => {},
};

export default SearchPanel;
