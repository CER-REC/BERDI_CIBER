import { useQuery } from '@apollo/react-hooks';
import { useMemo } from 'react';

import { toDateOnly } from '../utilities/date';
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

const getNotices = (translations) => {
  const notices = translations.filter(
    (translation) => translation.group === 'NOTICE',
  ).map(
    (translation) => translation.key,
  );

  return notices;
};

export default () => {
  const { loading, error, data } = useQuery(CONFIGURATION);

  const regions = useMemo(
    () => (data ? data.configuration.regions : []),
    [data],
  );

  const statuses = useMemo(
    () => (data ? getStatuses(data.configuration.translations).sort() : []),
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

  const notices = useMemo(
    () => (data ? getNotices(data.configuration.translations) : []),
    [data],
  );

  const translations = useMemo(
    () => (data ? getI18NMessages(data.configuration.translations) : {}),
    [data],
  );

  const applicationIdLabels = useMemo(() => {
    if (!data) {
      return {};
    }

    return data.applications.reduce((idLabels, application) => ({
      ...idLabels,
      [application.id]: application.shortName,
    }), {});
  }, [data]);

  const nameIds = useMemo(() => {
    if (!data) {
      return {};
    }

    return data.applications.reduce((acc, application) => ({
      ...acc,
      [application.id]: application.nameId,
    }), {});
  }, [data]);

  const applicationIds = useMemo(
    () => Object.keys(applicationIdLabels), [applicationIdLabels],
  );

  const maxDate = useMemo(
    () => (data ? toDateOnly(data.configuration.maxFilingDate) : new Date()),
    [data],
  );

  const minDate = useMemo(
    () => (data ? toDateOnly(data.configuration.minFilingDate) : new Date()),
    [data],
  );

  const fileSize = data ? data.configuration.fileSize : null;

  const fileDownloadURL = data ? data.configuration.fileDownloadURL : null;

  const tableCount = data ? data.configuration.tableCount : 0;

  const csvCount = data ? data.configuration.csvCount : 0;

  return {
    loading,
    error,
    regions,
    statuses,
    projectTypes,
    commodities,
    contentTypes,
    notices,
    applicationIds,
    applicationIdLabels,
    nameIds,
    translations,
    maxDate,
    minDate,
    fileSize,
    fileDownloadURL,
    tableCount,
    csvCount,
  };
};

