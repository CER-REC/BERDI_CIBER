import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import DatePicker from '../../components/DatePicker';
import Dropdown from '../../components/Dropdown';
import useAPI from '../../hooks/useAPI';

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
  const intl = useIntl();
  const { regions, statuses, projectTypes, commodities } = useAPI();
  const createDropdown = (title, dataItem) => (
    <Grid item xs={4} className={classes.selection}>
      <Dropdown title={title} data={dataItem ?? {}} />
    </Grid>
  );
  return (
    <>
      {/* Grey filter selection box */}
      <Typography variant="h6">{intl.formatMessage({ id: 'components.filterPanel.title' })}</Typography>

      <Grid container direction="row" alignItems="center" className={classes.filterBox}>
        {createDropdown('REGIONS', regions)}
        <Grid item xs={4} className={classes.selection}>
          <DatePicker maxDate={data?.maxFilingDate} minDate={data?.minFilingDate} />
        </Grid>
        {createDropdown('COMMODITIES', commodities)}
        {createDropdown('PROJECT_TYPES', projectTypes)}
        {createDropdown('STATUSES', statuses)}
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
