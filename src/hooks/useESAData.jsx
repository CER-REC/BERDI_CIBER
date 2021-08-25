import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { toDateOnlyString } from '../utilities/date';
import { RESULT_COUNT } from '../constants';
import useConfig from './useConfig';
import { SEARCH } from './queries';

const hasVariables = (config) => (
  config.applicationIds
  && config.regions
  && config.startDate
  && config.endDate
  && config.commodities
  && config.projectTypes
  && config.statuses
  && config.contentTypes
  && config.treemapApplicationIds
  && !Number.isNaN(config.searchIndex)
);

export default () => {
  const { config, config: { applicationIds, treemapApplicationIds }, configDispatch } = useConfig();
  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      search: config.search,
      applicationIds,
      regions: config.regions,
      startDate: toDateOnlyString(config.startDate),
      endDate: toDateOnlyString(config.endDate),
      commodities: config.commodities,
      projectTypes: config.projectTypes,
      statuses: config.statuses,
      contentTypes: config.contentTypes,
      searchApplicationIds: treemapApplicationIds.length ? treemapApplicationIds : applicationIds,
      first: RESULT_COUNT,
      offset: config.searchIndex * RESULT_COUNT,
    },
    skip: (config.page !== 'search') || !hasVariables(config),
  });
  const applications = useMemo(() => data?.applications || [], [data]);
  const excludedTreemapApplicationIds = useMemo(
    () => treemapApplicationIds.filter(
      (id) => !applications.find((application) => (application.id === id)),
    ),
    [treemapApplicationIds, applications],
  );

  useEffect(() => {
    if (excludedTreemapApplicationIds.length && !loading) {
      configDispatch({ type: 'treemapApplicationIds/removed', payload: excludedTreemapApplicationIds });
    }
  }, [configDispatch, excludedTreemapApplicationIds, loading]);
  return {
    loading,
    error,
    applications,
    contents: data?.contentSearch.contents || [],
    totalCount: data?.contentSearch.totalCount || 0,
    contentIds: data?.contentSearch.contentIds || [],
  };
};
