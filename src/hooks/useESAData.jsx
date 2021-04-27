import { useQuery } from '@apollo/react-hooks';

import { toDateOnlyString } from '../utilities/date';
import { RESULT_COUNT } from '../constants';
import useConfig from './useConfig';
import { SEARCH } from './queries';

const hasVariables = (config) => (
  config.searches
  && config.applicationIds
  && config.regions
  && config.startDate
  && config.endDate
  && config.commodities
  && config.projectTypes
  && config.statuses
  && config.contentTypes
  && !Number.isNaN(config.searchIndex)
);

export default () => {
  const { config } = useConfig();
  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      searches: config.searches,
      applicationIds: config.applicationIds,
      regions: config.regions,
      startDate: toDateOnlyString(config.startDate),
      endDate: toDateOnlyString(config.endDate),
      commodities: config.commodities,
      projectTypes: config.projectTypes,
      statuses: config.statuses,
      contentTypes: config.contentTypes,
      first: RESULT_COUNT,
      offset: config.searchIndex * RESULT_COUNT,
    },
    skip: (config.page !== 'search') || !hasVariables(config),
  });

  return {
    loading,
    error,
    applications: data?.applications || [],
    contents: data?.contentSearch.contents || [],
    totalCount: data?.contentSearch.totalCount || 0,
  };
};
