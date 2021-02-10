import React from 'react';
import {
  Typography, makeStyles, createStyles, Grid, NativeSelect, FormControl,
} from '@material-ui/core';

import CustomPaginationActionsTable from './Table';

const useStyles = makeStyles(() => createStyles({
  searchBox: {
    height: '20vh',
    backgroundColor: '#63b440',
  },
  filterBox: {
    height: '20vh',
    backgroundColor: '#e5e5e5',
  },
  selection: {
    width: '20vw',
  },
  searchIcon: {
    width: '8vh',
    height: '8vh',
    border: '5px solid black',
    margin: '1vw',
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <>
      {/* green search box */}
      <Grid container direction='column' style={{ marginBottom: '1vh' }}>
        <Typography variant='h2'> Search the Data</Typography>
        <Grid item className={classes.searchBox}>
          <Grid item>
            <Typography variant='h6' style={{ marginLeft: '10px' }}>Try custom keywords</Typography>
            <input style={{ marginLeft: '10px' }} />
          </Grid>
          <Grid container>
            <Grid item className={classes.searchIcon}>
            Icon
            </Grid>
            <Grid item className={classes.searchIcon}>
            Icon
            </Grid>
            <Grid item className={classes.searchIcon}>
            Icon
            </Grid>
            <Grid item className={classes.searchIcon}>
            Icon
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant='h6'>Try one of many of the filter options below. Unselect your choice to clear the filter.</Typography>

      {/* Grey filter selection box */}

      <Grid container direction='row' justify='space-evenly' alignItems='center' className={classes.filterBox}>
        <Grid item>
          <Typography variant='h6'>Project Name</Typography>
          <FormControl className={classes.selection}>
            <NativeSelect
              id="demo-customized-select-native"
            >
              <option value="all">(All)</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Province</Typography>
          <FormControl className={classes.selection}>
            <NativeSelect
              id="demo-customized-select-native"
            >
              <option value="all">(All)</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Date project was filed</Typography>
          <FormControl className={classes.selection}>
            <NativeSelect
              id="demo-customized-select-native"
            >
              <option value="date">Mar 17 2003 - Apr 04 2019</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Commodity</Typography>
          <FormControl className={classes.selection}>
            <NativeSelect
              id="demo-customized-select-native"
            >
              <option value="all">(All)</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Project Type (NEB Act)</Typography>
          <FormControl className={classes.selection}>
            <NativeSelect
              id="demo-customized-select-native"
            >
              <option value="all">(All)</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Pipeline Status</Typography>
          <FormControl className={classes.selection}>
            <NativeSelect
              id="demo-customized-select-native"
            >
              <option value="all">(All)</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      {/* TreeMap Section */}
      <Typography variant='h3'> View results</Typography>
      <Typography variant='h6'> 3,797 figures and 14,549 tables</Typography>

      <Grid container direction='row' justify='space-between' alignItems='center' style={{ backgroundColor: '#e5e5e5' }}>
        <Grid item style={{ paddingLeft: '5px' }}>
          <Typography variant='body1'>View by Project</Typography>
        </Grid>

        <Grid item style={{ paddingRight: '5px', textAlign: 'right' }}>
          <Typography variant='body1'>Hover to view details.</Typography>
          <Typography variant='body1'>Select a box to filter by project</Typography>
        </Grid>
      </Grid>

      <Grid style={{ height: '20vh', backgroundColor: '#63b440', marginTop: '1vh' }}>
          Treemap
      </Grid>

      {/* List section */}
      <Grid container justify='space-between' alignItems='center' style={{ backgroundColor: '#e5e5e5', marginTop: '1vh', height: '5vh' }}>
        <Grid item style={{ paddingLeft: '3px' }}>
          <Typography variant='body1'>View by Title</Typography>
        </Grid>

        <Grid item>
          <Grid container style={{ paddingRight: '3px' }}>
            <Typography variant='body1' style={{ marginRight: '3px' }}>Sort by data type</Typography>
            <FormControl className={classes.selection}>
              <NativeSelect
                id="demo-customized-select-native"
              >
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
