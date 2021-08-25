import React, { useCallback, useState } from 'react';

import { Grid } from '@material-ui/core';
import AccuracyAlert from '../../components/AccuracyAlert';
import Applications from '../../components/Applications';
import Cart from '../../components/Cart';
import SearchPanel from '../../components/SearchPanel';
import FilterPanel from '../../components/FilterPanel';
import ListSection from '../../components/ListPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import NavButtons from '../../components/NavButtons';
import FilterChipsPanel from '../../components/FilterChipsPanel';
import SearchDetails from '../../components/SearchDetails';
import TopicsFilter from '../../components/TopicsFilter';
import AddContentIdsButton from './AddContentIdsButton';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import { reportShowFilter } from '../../utilities/analytics';

const Search = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useAPI();
  const { config } = useConfig();
  const handleFilterChange = useCallback((event) => {
    if (event.target.checked) {
      reportShowFilter();
    }

    setOpen(event.target.checked);
  }, [setOpen]);

  if (loading) {
    return null;
  }

  return (
    <>
      <AccuracyAlert />
      <NavButtons />
      <SearchPanel hasFilter onChange={handleFilterChange} />
      { open && <FilterPanel /> }
      <SearchDetails />
      { (config.filter === 'topic') && <TopicsFilter /> }
      {
        (config.filter === 'project') && (
          <>
            <TreeMapPanel />
            <Applications />
          </>
        )
      }
      <Grid container>
        <Grid item xs={10}>
          <FilterChipsPanel />
        </Grid>
        <Grid item xs={2}>
          <AddContentIdsButton />
        </Grid>
      </Grid>
      <hr style={{ border: 'none', color: 'black', backgroundColor: 'black', height: '1px' }} />
      <Cart />
      <ListSection />
    </>
  );
};

export default Search;
