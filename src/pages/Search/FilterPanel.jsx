import React from 'react';
import {
  Typography, makeStyles, createStyles, Grid, NativeSelect, FormControl, Box,
} from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  filterBox: {
    padding: '10px',
    backgroundColor: '#e5e5e5',
    '& div': {
      textAlign: 'center',
    },
  },
  selection: {
    width: '20vw',
  },
}));

const FilterPanel = () => {
  const classes = useStyles();

  return (
    <>
      {/* Grey filter selection box */}
      <Typography variant="h6">Try one of many of the filter options below. Unselect your choice to clear the filter.</Typography>

      <Grid container direction="row" alignItems="center" className={classes.filterBox}>
        <Grid item xs={6}>
          <Typography variant="h6">Project Name</Typography>
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
        <Grid item xs={6}>
          <Typography variant="h6">Province</Typography>
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
        <Grid item xs={6}>
          <Typography variant="h6">Date project was filed</Typography>
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
        <Grid item xs={6}>
          <Typography variant="h6">Commodity</Typography>
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
        <Grid item xs={6}>
          <Typography variant="h6">Project Type (NEB Act)</Typography>
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
        <Grid item xs={6}>
          <Typography variant="h6">Pipeline Status</Typography>
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
    </>
  );
};
export default FilterPanel;
