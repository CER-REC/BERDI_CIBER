import { useQuery } from '@apollo/react-hooks';

import { toDateOnlyString } from '../utilities/date';
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
  && !Number.isNaN(config.searchIndex)
);

export default () => {
  const { config } = useConfig();
  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      searches: config.searches,
      applicationNames: config.applicationNames,
      regions: config.regions,
      startDate: toDateOnlyString(config.startDate),
      endDate: toDateOnlyString(config.endDate),
      commodities: config.commodities,
      projectTypes: config.projectTypes,
      statuses: config.statuses,
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
