import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { toDateOnlyString } from '../utilities/date';
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
  const {
    config: { applicationIds, topics, treemapApplicationIds },
    config,
    configDispatch,
  } = useConfig();
  const valueComponentFilter = useMemo(
    () => {
      const filter = {};

      topics.forEach((topic) => { filter[topic] = 1; });

      return filter;
    },
    [topics],
  );
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
      valueComponent: valueComponentFilter,
      first: config.resultCount,
      offset: config.searchIndex * config.resultCount,
    },
    skip: (config.page !== 'search') || !hasVariables(config),
  });
  const applications = useMemo(() => {
    if (data) {
      const types = config.contentTypes;

      if (!types.length) {
        return data.applications;
      }

      return data.applications.map((application) => ({
        ...application,
        alignmentSheetCount: types.includes('ALIGNMENT_SHEET') ? application.alignmentSheetCount : 0,
        figureCount: types.includes('FIGURE') ? application.figureCount : 0,
        tableCount: types.includes('TABLE') ? application.tableCount : 0,
      }));
    }

    return [];
  }, [config.contentTypes, data]);
  const valueComponent = useMemo(() => data?.contentSearch.valueComponent || {}, [data]);
  const excludedTreemapApplicationIds = useMemo(
    () => treemapApplicationIds.filter(
      (id) => !applications.find((application) => (application.id === id)),
    ),
    [treemapApplicationIds, applications],
  );
  const excludedTopics = useMemo(
    () => {
      const zeroes = Object.keys(valueComponent).filter((topic) => !valueComponent[topic]);

      return topics.filter((topic) => zeroes.includes(topic));
    },
    [topics, valueComponent],
  );

  useEffect(() => {
    if (excludedTreemapApplicationIds.length && !loading) {
      configDispatch({ type: 'treemapApplicationIds/removed', payload: excludedTreemapApplicationIds });
    }
  }, [configDispatch, excludedTreemapApplicationIds, loading]);

  useEffect(() => {
    if (excludedTopics.length && !loading) {
      configDispatch({ type: 'topics/removed', payload: excludedTopics });
    }
  }, [configDispatch, excludedTopics, loading]);

  return {
    loading,
    error,
    applications,
    contents: data?.contentSearch.contents || [],
    totalCount: data?.contentSearch.totalCount || 0,
    downloadTableIds: data?.contentSearch.downloadTableIds || [],
    valueComponent,
  };
};
