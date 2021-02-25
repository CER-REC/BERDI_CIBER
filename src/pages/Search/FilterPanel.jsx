import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, makeStyles, createStyles, Grid,
} from '@material-ui/core';
import DatePicker from '../../components/DatePicker';
import Dropdown from '../../components/Dropdown';

const useStyles = makeStyles(() => createStyles({
  filterBox: {
    padding: '10px',
    backgroundColor: '#e5e5e5',
  },
  selection: {
    margin: '0px',
    '& .formControl': {
      width: '95%',
    },

  },
}));

const FilterPanel = ({ data }) => {
  const classes = useStyles();

  const createDropdown = (title) => (
    <Grid item xs={4} className={classes.selection}>
      <Dropdown title={title} data={data[title] ?? {}} />
    </Grid>
  );
  return (
    <>
      {/* Grey filter selection box */}
      <Typography variant="h6">Try one of many of the filter options below. Unselect your choice to clear the filter.</Typography>

      <Grid container direction="row" alignItems="center" className={classes.filterBox}>
        {createDropdown('applicationNames')}
        {createDropdown('regions')}
        <Grid item xs={4} className={classes.selection}>
          <DatePicker maxDate={data?.maxFilingDate} minDate={data?.minFilingDate} />
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
