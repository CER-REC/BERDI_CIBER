import React, { useCallback } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import DatePicker from '../DatePicker';
import Dropdown from '../Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderWidth: '3px',
    padding: '1.5em',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    marginTop: '1.5em',
    width: '100%',
  },
}));

const FilterPanel = () => {
  const { maxDate, minDate } = useAPI();
  const { config, configDispatch } = useConfig();
  const classes = useStyles();
  const { applicationNames, regions, statuses, projectTypes, commodities } = useAPI();
  const intl = useIntl();
  // TODO: Extract into own component
  const createDropdown = (title, dataItem, dispatchAction, value) => {
    const handleChange = (items) => configDispatch({ type: dispatchAction, payload: items });

    return (
      <Grid item xs={4}>
        <Dropdown title={title} data={dataItem ?? {}} onChange={handleChange} value={value} />
      </Grid>
    );
  };
  const handleDatePickerChange = useCallback((start, end) => {
    configDispatch({ type: 'startDate/changed', payload: start });
    configDispatch({ type: 'endDate/changed', payload: end });
  }, [configDispatch]);
  const handleClick = useCallback(() => configDispatch({ type: 'filters/removed' }), [configDispatch]);

  return (
    <div className={`FilterPanel ${classes.root}`}>
      <Grid container spacing={5}>
        {createDropdown('APPLICATION_NAMES', applicationNames, 'applicationNames/changed', config.applicationNames)}
        {createDropdown('REGIONS', regions, 'regions/changed', config.regions)}
        <Grid item xs={4}>
          <DatePicker
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleDatePickerChange}
            startDate={config.startDate}
            endDate={config.endDate}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        {createDropdown('COMMODITIES', commodities, 'commodities/changed', config.commodities)}
        {createDropdown('PROJECT_TYPES', projectTypes, 'projectTypes/changed', config.projectTypes)}
        {createDropdown('STATUSES', statuses, 'statuses/changed', config.statuses)}
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Button
            classes={{ root: classes.button }}
            color="primary"
            variant="contained"
            onClick={handleClick}
            disableElevation
          >
            {intl.formatMessage({ id: 'components.filterPanel.clearButton' })}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterPanel;
