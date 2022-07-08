import React, { useCallback, useState, useEffect } from 'react';
import { Grid, Switch, Typography, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSearch, reportSearchHelp } from '../../utilities/analytics';
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
    paddingBottom: '2em',
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

const SearchPanel = ({ hasTagline, onChange }) => {
  const [search, setSearch] = useState('');
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();

  const handleChange = useCallback((event) => setSearch(event.target.value), [setSearch]);
  
  const handleClick = useCallback(() => {
    reportSearch(search);
    configDispatch({ type: 'search/changed', payload: { search: search.trim(), fragment: 'search' }});
  }, [search, configDispatch]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => setSearch(config.search), [config.search]);

  return (
    <div className={`${hasTagline ? classes.gradientRoot : classes.imageRoot}`}>
      <Grid container className={classes.searchPanel} alignItems="center">
        {!hasTagline && (
          <Grid item xs={9}>
            <TitleCard />
          </Grid>
        )}
        <Grid item xs={9} className={classes.barContainer}>
          {hasTagline && (
            <>
              <ToolLogo style={{ width: '8em', margin: '0 2em 0 1em' }} />
            </>
          )}
          <SearchBar hasShrink textValue={search} onTextChanged={handleChange} onEnterPressed={handleKeyDown} />
        </Grid>
        <Grid item xs={9}>
          <FilterPanel />
        </Grid>
        <Button
          aria-label={intl.formatMessage({ id: 'components.searchPanel.searchButton' })}
          onClick={handleClick}
        >
          {hasTagline ? "See Results" : "Search"}
        </Button>
      </Grid>
    </div>
  );
};

SearchPanel.propTypes = {
  hasTagline: PropTypes.bool.isRequired,
};

export default SearchPanel;
