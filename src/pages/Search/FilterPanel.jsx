import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import DatePicker from '../../components/DatePicker';
import Dropdown from '../../components/Dropdown';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';

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

const FilterPanel = () => {
  const { maxDate, minDate } = useAPI();
  const { config, configDispatch } = useConfig();
  const classes = useStyles();
  // const intl = useIntl();
  const { regions, statuses, projectTypes, commodities } = useAPI();
  // TODO: Extract into own component
  const createDropdown = (title, dataItem, dispatchAction, value) => {
    const handleChange = (items) => {
      configDispatch({ type: dispatchAction, payload: items });
    };

    return (
      <Grid item xs={4} className={classes.selection}>
        <Dropdown title={title} data={dataItem ?? {}} onChange={handleChange} value={value} />
      </Grid>
    );
  };
  const handleDatePickerChange = useCallback((start, end) => {
    configDispatch({ type: 'startDate/changed', payload: start });
    configDispatch({ type: 'endDate/changed', payload: end });
  }, [configDispatch]);

  return (
    <>
      {/* Grey filter selection box */}
      <Grid container direction="row" alignItems="center" className={classes.filterBox}>
        {createDropdown('REGIONS', regions, 'regions/changed', config.regions)}
        <Grid item xs={4} className={classes.selection}>
          <DatePicker
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleDatePickerChange}
            startDate={config.startDate}
            endDate={config.endDate}
          />
        </Grid>
        {createDropdown('COMMODITIES', commodities, 'commodities/changed', config.commodities)}
        {createDropdown('PROJECT_TYPES', projectTypes, 'projectTypes/changed', config.projectTypes)}
        {createDropdown('STATUSES', statuses, 'statuses/changed', config.statuses)}
      </Grid>
    </>
  );
};

export default FilterPanel;
