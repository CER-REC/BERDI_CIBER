import React, { useCallback, useState } from 'react';

import AccuracyAlert from '../../components/AccuracyAlert';
import SearchPanel from '../../components/SearchPanel';
import FilterPanel from '../../components/FilterPanel';
import ListSection from '../../components/ListPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import { reportShowFilter } from '../../utilities/analytics';

const Search = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useAPI();
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
      <SearchPanel hasFilter onChange={handleFilterChange} />

      { open && <FilterPanel /> }

      {/* TreeMap Section */}
      <TreeMapPanel />

      {/* List section */}
      <ListSection />
    </>
  );
};

export default Search;
