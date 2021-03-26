import React, { useCallback, useState } from 'react';

import SearchPanel from '../../components/SearchPanel';
import FilterPanel from '../../components/FilterPanel';
import ListSection from '../../components/ListPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import { reportShowFilter, reportSort } from '../../utilities/analytics';

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
  const handleSortChange = useCallback((event) => {
    reportSort(
      config.regions,
      config.commodities,
      config.projectTypes,
      config.statuses,
      config.applicationNames,
      event.target.value,
    );
    configDispatch({ type: 'sort/changed', payload: event.target.value });
  }, [config, configDispatch]);

  if (loading) {
    return null;
  }

  // TODO: Replace enums in the native select sort with the list from useAPI to make it dynamic
  return (
    <>
      <SearchPanel hasFilter onChange={handleFilterChange} />

      { open && <FilterPanel /> }

      {/* TreeMap Section */}
      <TreeMapPanel />

      {/* List section */}
      <ListSection onChange={handleSortChange} />
    </>
  );
};

export default Search;
