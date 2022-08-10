import React, { useCallback, useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import useAPI from '../../../hooks/useAPI';
import useConfig from '../../../hooks/useConfig';
import DateSlider from '../../DateSlider';
import Filter from '../Filter';
import ViewMoreFiltersButton from '../ViewMoreFiltersButton';
import { reportShowFilter } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: '1.8em',
    width: '100%',
  },
  searchButton: {
    backgroundColor: 'white',
    minWidth: '10em',
    marginTop: '1em',
    '&:focus-visible': { backgroundColor: theme.palette.grey.light },
  },
}));

const FilterPanel = ({ isSearchPage, onClick }) => {
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

  const searchButtonText = isSearchPage
    ? intl.formatMessage({ id: 'components.searchPanel.seeResultsButton' })
    : intl.formatMessage({ id: 'components.searchPanel.searchButton' });

  const toggleExpand = () => {
    if (!open) reportShowFilter();

    setOpen(!open);
  };

  return (
    <div
      className={`FilterPanel ${classes.root}`}
      aria-label={intl.formatMessage({ id: 'components.searchPanel.filterPanel.filters' })}
    >
      {open
        && (
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
              {intl.formatMessage({ id: 'components.searchPanel.filterPanel.clearButton' })}
            </Button>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button
              className={classes.searchButton}
              aria-label={searchButtonText}
              onClick={onClick}
              variant="contained"
              disableRipple
              size="small"
            >
              {searchButtonText}
            </Button>
          </Grid>
        </Grid>
        )}
      <Grid container direction="row" alignItems="center" justify="center" style={{ paddingTop: '1em' }}>
        <ViewMoreFiltersButton isOpen={open} toggleExpand={toggleExpand} />
      </Grid>
    </div>
  );
};

FilterPanel.propTypes = {
  isSearchPage: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FilterPanel.defaultProps = {
  isSearchPage: false,
};

export default FilterPanel;
