import { createStyles, FormControl, Grid, makeStyles, NativeSelect, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';

import SearchPanel from '../../components/SearchPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import FilterPanel from './FilterPanel';
import CustomPaginationActionsTable from './Table';
import TreeMapPanel from './Treemap';

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
  const { loading } = useAPI();

  const { config, configDispatch } = useConfig();

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
      <Grid container justify="space-between" alignItems="center" style={{ backgroundColor: '#e5e5e5', marginTop: '1vh', height: '5vh' }}>
        <Grid item style={{ paddingLeft: '3px' }}>
          <Typography variant="body1">View by Title</Typography>
        </Grid>

        <Grid item>
          <Grid container style={{ paddingRight: '3px' }}>
            <Typography variant="body1" style={{ marginRight: '3px' }}>Sort by data type</Typography>
            <FormControl className={classes.selection}>
              <NativeSelect value={config.sort || ''} onChange={handleSortChange}>
                <option value="TABLE">Table</option>
                <option value="FIGURE">Figure</option>
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {/* Table Section */}
      <CustomPaginationActionsTable />
    </>
  );
};

export default Search;
