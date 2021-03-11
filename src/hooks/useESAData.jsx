import { useQuery } from '@apollo/react-hooks';

import { RESULT_COUNT } from '../constants';
import parseData from './parseData';
import useConfig from './useConfig';
import { SEARCH } from './queries';

const hasVariables = (config) => (
  config.searches
  && config.applicationNames
  && config.regions
  && config.startDate
  && config.endDate
  && config.commodities
  && config.projectTypes
  && config.statuses
  && config.sort
  && !Number.isNaN(config.searchIndex)
);

export default () => {
  const { config } = useConfig();
  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      searches: config.searches,
      applicationNames: config.applicationNames,
      regions: config.regions,
      // Remove time from date to avoid mismatches due to timezones
      startDate: config.startDate?.toJSON().substring(0, 10),
      endDate: config.endDate?.toJSON().substring(0, 10),
      commodities: config.commodities,
      projectTypes: config.projectTypes,
      statuses: config.statuses,
      sort: config.sort,
      first: RESULT_COUNT,
      offset: config.searchIndex * RESULT_COUNT,
    },
    skip: (config.page !== 'search') || !hasVariables(config),
  });

  return {
    loading,
    error,
    applications: parseData(data?.applications),
    contents: data?.contentSearch.contents || [],
    totalCount: data?.contentSearch.totalCount || 0,
  };
};
