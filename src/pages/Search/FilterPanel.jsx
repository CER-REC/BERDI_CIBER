import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, makeStyles, createStyles, Grid, NativeSelect, FormControl,
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
    padding: '20px',
  },
}));

const dropdownTitles = {
  applicationNames: 'Project Name',
  applicationTypes: 'Project Type (NEB Act)',
  // FIXME: this is a typo on the back end
  commondities: 'Commodity',
  regions: 'Province',
  statuses: 'Pipeline Status',
};

const FilterPanel = ({ data }) => {
  const classes = useStyles();

  const createDropdown = (title) => (dropdownTitles[title] ? (
    <Grid item xs={4}>
      <Typography variant="h6">{dropdownTitles[title]}</Typography>
      <FormControl className={classes.selection}>
        <NativeSelect
          id="demo-customized-select-native"
        >
          {data[title].map((entry) => <option key={`${entry}Dropdown`} value={entry}>{entry}</option>)}
        </NativeSelect>
      </FormControl>
    </Grid>
  ) : null);
  return (
    <>
      {/* Grey filter selection box */}
      <Typography variant="h6">Try one of many of the filter options below. Unselect your choice to clear the filter.</Typography>

      <Grid container direction="row" alignItems="center" className={classes.filterBox}>
        {createDropdown('applicationNames')}
        {createDropdown('regions')}
        <Grid item xs={4}>
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
        {createDropdown('commondities')}
        {createDropdown('applicationTypes')}
        {createDropdown('statuses')}
      </Grid>
    </>
  );
};

FilterPanel.propTypes = {
  data: PropTypes.shape({
    applicationNames: PropTypes.arrayOf(PropTypes.string),
    applicationTypes: PropTypes.arrayOf(PropTypes.string),
    commondities: PropTypes.arrayOf(PropTypes.string),
    contentTypes: PropTypes.arrayOf(PropTypes.string),
    maxFilingDate: PropTypes.string,
    minFilingDate: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.string),
    statuses: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default FilterPanel;
