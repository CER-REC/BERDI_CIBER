import React, { useCallback, useState, useEffect } from 'react';
import { Grid, Switch, Typography, Divider, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSearch, reportSearchHelp } from '../../utilities/analytics';
import SearchBar from './SearchBar';
import ToolLogo from '../ToolLogo';
import TitleCard from '../TitleCard';

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

const SearchPanel = ({ hasFilter, onChange }) => {
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
            </>
          )}
          <SearchBar hasShrink textValue={search} onTextChanged={handleChange} onEnterPressed={handleKeyDown} />
        </Grid>
        {hasFilter && (
          <Grid item xs={3} classes={{ root: classes.sideBlock }}>
            <>
              <Typography classes={{ root: classes.filterLabel }} variant="h6">
                {intl.formatMessage({ id: 'components.searchPanel.filterLabel' })}
              </Typography>
              <Switch color="default" onChange={onChange} />
            </>
          </Grid>
        )}
        <Button
          aria-label={intl.formatMessage({ id: 'components.searchPanel.searchButton' })}
          onClick={handleClick}
        >
          {hasFilter ? "See Results" : "Search"}
        </Button>
      </Grid>
    </div>
  );
};

SearchPanel.propTypes = {
  hasFilter: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

SearchPanel.defaultProps = {
  onChange: () => { },
};

export default SearchPanel;
