import React, { useCallback } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';
import DateSlider from '../DateSlider';
import Filter from './Filter';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.purple.alt,
    borderStyle: 'solid',
    borderWidth: '3px',
    padding: '1.5em',
  },
  button: {
    marginTop: '1.5em',
    width: '100%',
  },
}));

const FilterPanel = () => {
  const { maxDate, minDate } = useAPI();
  const { config, configDispatch } = useConfig();
  const classes = useStyles();
  const { applicationIds, regions, statuses, projectTypes, commodities, contentTypes } = useAPI();
  const intl = useIntl();
  const handleDatePickerChange = useCallback((start, end) => {
    configDispatch({ type: 'startDate/changed', payload: start });
    configDispatch({ type: 'endDate/changed', payload: end });
  }, [configDispatch]);
  const handleClick = useCallback(() => configDispatch({ type: 'filters/removed' }), [configDispatch]);

  return (
    <div
      className={`FilterPanel ${classes.root}`}
      aria-label={intl.formatMessage({ id: 'components.filterPanel.filters' })}
    >
      <Grid container spacing={5}>
        <Filter
          type="APPLICATION_NAMES"
          action="applicationIds/changed"
          options={applicationIds}
          value={config.applicationIds}
          hasHelp={false}
        />
        <Filter
          type="REGIONS"
          action="regions/changed"
          options={regions}
          value={config.regions}
          hasHelp={false}
        />
        <Grid item xs={4}>
          <DateSlider
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleDatePickerChange}
            startDate={config.startDate}
            endDate={config.endDate}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Filter
          type="CONTENT_TYPES"
          action="contentTypes/changed"
          options={contentTypes}
          value={config.contentTypes}
          hasHelp={false}
        />
        <Filter
          type="PROJECT_TYPES"
          action="projectTypes/changed"
          options={projectTypes}
          value={config.projectTypes}
          hasHelp
        />
      </Grid>
      <Grid container spacing={5}>
        <Filter
          type="COMMODITIES"
          action="commodities/changed"
          options={commodities}
          value={config.commodities}
          hasHelp={false}
        />
        <Filter
          type="STATUSES"
          action="statuses/changed"
          options={statuses}
          value={config.statuses}
          hasHelp={false}
        />
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
