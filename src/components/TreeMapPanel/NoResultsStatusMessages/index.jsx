import React from 'react';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import useAPI from '../../../hooks/useAPI';

const NoResultsStatusMessages = () => {
  const intl = useIntl();
  const { config } = useConfig();
  const { minDate, maxDate } = useAPI();
  const combinedSearches = config.searches.join(' ');

  // Assemble booleans to differentiate between states
  const hasSearches = config.searches.length > 0;

  const hasFilter = config.applicationIds.length > 0 || config.regions.length > 0
    || config.commodities.length > 0 || config.projectTypes.length > 0
    || config.statuses.length > 0 || config.contentTypes.length > 0;

  const hasDateRange = config.startDate.getTime() !== minDate.getTime()
    || config.endDate.getTime() !== maxDate.getTime();

  return (
    // Show no results
    (!hasSearches && !hasFilter && !hasDateRange && (
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
  );
};

export default NoResultsStatusMessages;
