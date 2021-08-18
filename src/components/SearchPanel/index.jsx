import React from 'react';
import { Grid, Switch, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import ExploreButton from './ExploreButton';
import SearchBar from './SearchBar';

const useStyles = makeStyles({
  root: {
    backgroundImage: 'linear-gradient(180deg, #4F5496 0%, #5B3B67 158.06%)',
    padding: '1.5em',
    color: 'white',
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
});

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
