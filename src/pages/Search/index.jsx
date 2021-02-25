import React from 'react';
import {
  Typography, makeStyles, createStyles, Grid, NativeSelect, FormControl,
} from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import PoolIcon from '@material-ui/icons/Pool';
import EcoIcon from '@material-ui/icons/Eco';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import useAPI from '../../hooks/useAPI';
import TreeMapPanel from './Treemap';
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

  const { data: configData } = useAPI();

  if (!configData) {
    return null;
  }

  return (
    <>
      {/* green search box */}
      <Typography variant="h2"> Search the Data</Typography>
      <Grid
        container
        className={classes.searchBox}
      >
        <Grid direction="column" container item xs={6}>
          <input style={{ marginTop: '10px', marginLeft: '10px', width: '12vw' }} placeholder="Search by keyword(s)" />
          <Grid container item className={classes.searchIcon} wrap="nowrap">
            <PetsIcon />
            <PoolIcon />
            <EcoIcon />
            <HomeWorkIcon />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Environmental and Socio-Economic Assessments cover as many as 19 categories of
            &quot;components&quot; for assessment! Learn more.
          </Typography>
          <Typography>Read our disclaimer for considerations</Typography>
        </Grid>
      </Grid>

      {/* Grey filter selection box */}
      <FilterPanel data={configData.configuration} />

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
              <NativeSelect>
                <option value="all">Table</option>
                <option value={10}>Figure</option>
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
