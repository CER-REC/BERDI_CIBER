import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import EcoIcon from '@material-ui/icons/Eco';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PetsIcon from '@material-ui/icons/Pets';
import PoolIcon from '@material-ui/icons/Pool';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import FilterPanel from './FilterPanel';
import ListSection from '../../components/SearchList';
// import CustomPaginationActionsTable from './Table';

const useStyles = makeStyles(() => createStyles({
  searchBox: {
    height: '20vh',
    backgroundColor: '#63b440',
    '& p': {
      marginTop: '5px',
      fontSize: '25px',
    },
  },
  filterBox: {
    height: '20vh',
    backgroundColor: '#e5e5e5',
  },
  selection: {
    width: '20vw',
  },
  searchIcon: {
    '& svg': {
      width: '7vh',
      height: '7vh',
      margin: '1vw',
    },
  },

}));

const Search = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { loading } = useAPI();
  const [search, setSearch] = useState('');
  const { config, configDispatch } = useConfig();
  const handleSearchChange = useCallback((event) => setSearch(event.target.value), [setSearch]);
  const handleClick = useCallback(() => {
    const searches = search.split(' ').filter((term) => term);

    configDispatch({ type: 'searches/changed', payload: searches });
  }, [search, configDispatch]);
  const handleKeyDown = useCallback((event) => (event.key === 'Enter') && handleClick(), [handleClick]);
  const handleSortChange = useCallback((event) => configDispatch({ type: 'sort/changed', payload: event.target.value }), [configDispatch]);

  useEffect(() => {
    setSearch(config.searches.join(' '));
  }, [config.searches]);

  if (loading) {
    return null;
  }

  // TODO: Replace enums in the native select sort with the list from useAPI to make it dynamic
  return (
    <>
      {/* green search box */}
      <Typography variant="h2">{intl.formatMessage({ id: 'components.searchPanel.title' })}</Typography>
      <Grid
        container
        className={classes.searchBox}
      >
        <Grid direction="column" container item xs={6}>
          <input value={search} onKeyDown={handleKeyDown} onChange={handleSearchChange} style={{ marginTop: '10px', marginLeft: '10px', width: '12vw' }} placeholder={intl.formatMessage({ id: 'components.searchPanel.inputPlaceholder' })} />
          <button type="button" onClick={handleClick}>Search</button>
          <Grid container item className={classes.searchIcon} wrap="nowrap">
            <PetsIcon />
            <PoolIcon />
            <EcoIcon />
            <HomeWorkIcon />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {intl.formatMessage({ id: 'components.searchPanel.description' })}
            <a href={intl.formatMessage({ id: 'components.searchPanel.link1' })}>{` ${intl.formatMessage({ id: 'components.searchPanel.linkText1' })}`}</a>
          </Typography>
          <Typography><a href={intl.formatMessage({ id: 'components.searchPanel.link2' })}>{intl.formatMessage({ id: 'components.searchPanel.linkText2' })}</a></Typography>
        </Grid>
      </Grid>

      {/* Grey filter selection box */}
      <FilterPanel />

      {/* TreeMap Section */}
      <TreeMapPanel />

      {/* List section */}
      <ListSection onChange={handleSortChange} />
    </>
  );
};

export default Search;
