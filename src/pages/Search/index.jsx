import React, { useCallback, useState } from 'react';

import SearchPanel from '../../components/SearchPanel';
import FilterPanel from '../../components/FilterPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import ListSection from '../../components/ListPanel';

const Search = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useAPI();
  const { configDispatch } = useConfig();
  const handleFilterChange = useCallback((event) => setOpen(event.target.checked), [setOpen]);
  const handleSortChange = useCallback((event) => configDispatch({ type: 'sort/changed', payload: event.target.value }), [configDispatch]);

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
