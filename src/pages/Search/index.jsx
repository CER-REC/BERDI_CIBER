import React, { useCallback } from 'react';
import { Button, FormControl, Grid, NativeSelect, Typography, createStyles, makeStyles } from '@material-ui/core';

import SearchPanel from '../../components/SearchPanel';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import FilterPanel from './FilterPanel';
import CustomPaginationActionsTable from './Table';

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
        <Grid item style={{ textAlign: 'right' }}>
          <Button style={{
            width: 'auto',
            textTransform: 'none',
            background: '#284162',
            borderRadius: '5px',
            color: 'white',
            padding: '0.5% 2%',
            whiteSpace: 'nowrap',
          }}
          >
            Access full dataset
          </Button>
        </Grid>
      </Grid>
      {/* Table Section */}
      <CustomPaginationActionsTable />
    </>
  );
};

export default Search;
