import React, { useCallback, useState } from 'react';

import AccuracyAlert from '../../components/AccuracyAlert';
import Applications from '../../components/Applications';
import SearchPanel from '../../components/SearchPanel';
import FilterPanel from '../../components/FilterPanel';
import ListSection from '../../components/ListPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import NavButtons from '../../components/NavButtons';
import FilterChipsPanel from '../../components/FilterChipsPanel';
import SearchDetails from '../../components/SearchDetails';
import TopicsFilter from '../../components/TopicsFilter';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import { reportShowFilter } from '../../utilities/analytics';

const Search = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useAPI();
  const { config, configDispatch } = useConfig();
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
      <FilterChipsPanel />
      <ListSection />
    </>
  );
};

export default Search;
