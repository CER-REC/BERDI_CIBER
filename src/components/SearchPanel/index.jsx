import React from 'react';
import { Grid, Divider, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import ToolLogo from '../ToolLogo';
import TitleCard from '../TitleCard';
import FilterPanel from './FilterPanel';

const useStyles = makeStyles((theme) => ({
  imageRoot: {
    background: 'linear-gradient(#4F5699, #544275)',
    paddingBottom: '2em',
  },
  gradientRoot: {
    backgroundImage: `linear-gradient(180deg, #4F5496 0%, ${theme.palette.purple.alt} 158.06%)`,
    borderRadius: '10px',
    position: 'relative',
    zIndex: 1,
    paddingBottom: '2em'
  },
  searchPanel: {
    padding: '0 1.5em',
    minHeight: '6em',
    color: 'white',
    justifyContent: 'center',
  },
  barContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '6em',
  },
  divider: {
    background: theme.palette.common.white,
    marginRight: '2.5em',
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

const SearchPanel = ({ hasFilter }) => {
  const classes = useStyles();

  return (
    <div className={`${hasFilter ? classes.gradientRoot : classes.imageRoot}`}>
      <Grid container className={classes.searchPanel} alignItems="center">
        {!hasFilter && (
          <Grid item xs={9}>
            <TitleCard />
          </Grid>
        )}
        <Grid item xs={9} className={classes.barContainer}>
          {hasFilter && (
            <>
              <ToolLogo style={{ width: '8em', margin: '0 2em 0 1em' }} />
              <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
            </>
          )}
          <SearchBar hasShrink />
        </Grid>
        <Grid item xs={9}>
          <FilterPanel />
        </Grid>
      </Grid>
    </div>
  );
};

SearchPanel.propTypes = {
  hasFilter: PropTypes.bool.isRequired
};

export default SearchPanel;
