import { useQuery } from '@apollo/react-hooks';
import { useMemo } from 'react';
import getI18NMessages from '../utilities/getI18NMessages';
import { CONFIGURATION } from './queries';

const getStatuses = (translations) => {
  const statuses = translations.filter(
    (translation) => translation.group === 'STATUS',
  ).map(
    (translation) => translation.key,
  );
  return statuses;
};
const getProjectTypes = (translations) => {
  const projects = translations.filter(
    (translation) => translation.group === 'PROJECT_TYPE',
  ).map(
    (translation) => translation.key,
  );
  return projects;
};
const getCommodities = (translations) => {
  const commodities = translations.filter(
    (translation) => translation.group === 'COMMODITY',
  ).map(
    (translation) => translation.key,
  );
  return commodities;
};
const getContentTypes = (translations) => {
  const contentTypes = translations.filter(
    (translation) => translation.group === 'CONTENT_TYPE',
  ).map(
    (translation) => translation.key,
  );
  return contentTypes;
};

export default () => {
  const { loading, error, data } = useQuery(CONFIGURATION);
  const regions = useMemo(
    () => (data ? data.configuration.regions : []),
    [data],
  );
  const statuses = useMemo(
    () => (data ? getStatuses(data.configuration.translations) : []),
    [data],
  );
  const projectTypes = useMemo(
    () => (data ? getProjectTypes(data.configuration.translations) : []),
    [data],
  );
  const commodities = useMemo(
    () => (data ? getCommodities(data.configuration.translations) : []),
    [data],
  );
  const contentTypes = useMemo(
    () => (data ? getContentTypes(data.configuration.translations) : []),
    [data],
  );
  const translations = useMemo(
    () => (data ? getI18NMessages(data.configuration.translations) : {}),
    [data],
  );
  const applicationNames = useMemo(
    () => (data ? data.configuration.applicationNames : []),
    [data],
  );
  const maxDate = useMemo(
    // TODO: Move all date time resets to utility functions
    () => (data ? new Date(`${data.configuration.maxFilingDate.substring(0, 10)}T00:00:00`) : new Date()),
    [data],
  );
  const minDate = useMemo(
    // TODO: Move all date time resets to utility functions
    () => (data ? new Date(`${data.configuration.minFilingDate.substring(0, 10)}T00:00:00`) : new Date()),
    [data],
  );

  return {
    loading,
    error,
    regions,
    statuses,
    projectTypes,
    commodities,
    contentTypes,
    applicationNames,
    translations,
    maxDate,
    minDate,
  };
};

