import React, { useCallback } from 'react';

import SearchPanel from '../../components/SearchPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import FilterPanel from './FilterPanel';
import ListSection from '../../components/ListPanel';

const Search = () => {
  const { loading } = useAPI();

  const { configDispatch } = useConfig();

  const handleSortChange = useCallback((event) => configDispatch({ type: 'sort/changed', payload: event.target.value }), [configDispatch]);

  if (loading) {
    return null;
  }

  // TODO: Replace enums in the native select sort with the list from useAPI to make it dynamic
  return (
    <>
      <SearchPanel hasFilter />

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
