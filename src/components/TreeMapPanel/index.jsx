import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import TreeMap from './TreeMap';
import useAPI from '../../hooks/useAPI';

const useStyles = makeStyles({
  title: {
    fontSize: '36px',
    paddingTop: '0.5em',
    fontWeight: '400',
  },
  body: {
    fontSize: '24px',
    paddingTop: '0.2em',
    fontWeight: '400',
  },
});

const TreeMapPanel = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { config } = useConfig();
  const { minDate, maxDate } = useAPI();
  const { applications, loading } = useESAData();
  const combinedSearches = config.searches.join(' ');
  const figureCount = applications.reduce(
    (count, application) => (application.figureCount + count),
    0,
  );
  const tableCount = applications.reduce(
    (count, application) => (application.tableCount + count),
    0,
  );

  if (!applications.length && loading) {
    return null;
  }

  // Assemble booleans to differentiate between states
  const hasResults = applications.length;
  const hasSearches = config.searches.length > 0;

  const hasFilter = config.applicationIds.length > 0 || config.regions.length > 0
  || config.commodities.length > 0 || config.projectTypes.length > 0
  || config.statuses.length > 0 || config.contentTypes.length > 0;

  const hasDateRange = config.startDate.getTime() !== minDate.getTime()
    || config.endDate.getTime() !== maxDate.getTime();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {intl.formatMessage({ id: 'components.treeMapPanel.title' })}
      </Typography>
      {
        // Show actual results
        (hasResults && (
          <>
            <Typography variant="h6" className={classes.body}>
              {intl.formatMessage({ id: 'components.treeMapPanel.counts' }, {
                tables: tableCount,
                figures: figureCount,
              })}
            </Typography>
            <Typography style={{ padding: '0.5em 0 0.2em 0' }}>
              {intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })}
            </Typography>
            <TreeMap />
          </>
        ))

        // Show no results
        || (!hasSearches && !hasFilter && !hasDateRange && (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {intl.formatMessage({ id: 'components.treeMapPanel.noResults' })}
          </Typography>
        ))

        // Show no results when using keyword search
        || (hasSearches && !hasFilter && !hasDateRange && (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {
              intl.formatMessage({ id: 'components.treeMapPanel.noResultsFor' }, {
                searches: (<strong style={{ fontWeight: '700' }}>{combinedSearches}</strong>),
              })
            }
          </Typography>
        ))

        // Show no results when using filters only
        // (Show this message regardless of date range)
        || (!hasSearches && hasFilter && (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {intl.formatMessage({ id: 'components.treeMapPanel.noResultsWithFilters' })}
          </Typography>
        ))

        // Show no results when using keyword search and filters
        // (Show this message regardless of date range)
        || (hasSearches && hasFilter && (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {
              intl.formatMessage({ id: 'components.treeMapPanel.noResultsForWithFilters' }, {
                searches: (<strong style={{ fontWeight: '700' }}>{combinedSearches}</strong>),
              })
            }
          </Typography>
        ))

        // Show no results when using keyword search and date range
        || (hasSearches && !hasFilter && hasDateRange && (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {
              intl.formatMessage({ id: 'components.treeMapPanel.noResultsForWithDateRange' }, {
                searches: (<strong style={{ fontWeight: '700' }}>{combinedSearches}</strong>),
              })
            }
          </Typography>
        ))

        // Show no results when using date range only
        || (!hasSearches && !hasFilter && hasDateRange && (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {intl.formatMessage({ id: 'components.treeMapPanel.noResultsWithDateRange' })}
          </Typography>
        ))
      }
    </>
  );
};

export default TreeMapPanel;
