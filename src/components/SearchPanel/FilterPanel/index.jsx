import React, { useCallback, useState } from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import { useIntl } from 'react-intl';

import useAPI from '../../../hooks/useAPI';
import useConfig from '../../../hooks/useConfig';
import DateSlider from '../../DateSlider';
import Filter from '../Filter';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: '1.8em',
    width: '100%',
  },
  showMore: {
    cursor: 'pointer',
  },
}));

const FilterPanel = () => {
  const [open, setOpen] = useState(false);
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
      <Grid container spacing={2}>
        <Filter
          type="APPLICATION_NAMES"
          action="applicationIds/changed"
          options={applicationIds}
          value={config.applicationIds}
          hasHelp={false}
        />
        <Grid item xs={3}>
          <DateSlider
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleDatePickerChange}
            startDate={config.startDate != null ? config.startDate : minDate}
            endDate={config.endDate != null ? config.endDate : maxDate}
          />
        </Grid>
        <Filter
          type="CONTENT_TYPES"
          action="contentTypes/changed"
          options={contentTypes}
          value={config.contentTypes}
          hasHelp={false}
        />
        <Filter
          type="COMMODITIES"
          action="commodities/changed"
          options={commodities}
          value={config.commodities}
          hasHelp={false}
        />
      </Grid>
      {open
        && (
        <Grid container spacing={2}>
          <Filter
            type="REGIONS"
            action="regions/changed"
            options={regions}
            value={config.regions}
            hasHelp={false}
          />
          <Filter
            type="PROJECT_TYPES"
            action="projectTypes/changed"
            options={projectTypes}
            value={config.projectTypes}
            hasHelp
          />
          <Filter
            type="STATUSES"
            action="statuses/changed"
            options={statuses}
            value={config.statuses}
            hasHelp={false}
          />
          <Grid item xs={3}>
            <Button
              classes={{ root: classes.button }}
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              {intl.formatMessage({ id: 'components.filterPanel.clearButton' })}
            </Button>
          </Grid>
        </Grid>
        )}
      <Grid container direction="row" alignItems="center" justify="center" style={{ paddingTop: '1em' }}>
        <Grid item>
          <Typography className={classes.showMore} onClick={() => setOpen(!open)}>
            {open ? intl.formatMessage({ id: 'components.filterPanel.viewLessFilters' }) : intl.formatMessage({ id: 'components.filterPanel.viewMoreFilters' })}
          </Typography>
        </Grid>
        <Grid item>
          {open
            ? <KeyboardArrowUp className={classes.showMore} />
            : <KeyboardArrowDown className={classes.showMore} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterPanel;
