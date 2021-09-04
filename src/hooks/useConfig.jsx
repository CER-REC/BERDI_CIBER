import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import LZUTF8 from 'lzutf8';
import { decompress } from 'int-compress-string';
import queryString from 'query-string';

import { toDateOnly, toDateOnlyString } from '../utilities/date';
import { initialState, getReducer } from './reducer';
import useAPI from './useAPI';

const parameters = ['page', 'filter', 'searchIndex', 'cartIndex'];
const dateParameters = ['startDate', 'endDate'];
const delimitedParameters = ['regions', 'commodities', 'projectTypes', 'statuses', 'contentTypes', 'topics'];
const encodedParameters = ['search', 'applicationIds', 'treemapApplicationIds'];
const history = createBrowserHistory();
const ConfigContext = createContext();
let unlistenHistory = () => {};

const decodeParameter = (encodedParameter) => {
  let parameter;

  try {
    const json = LZUTF8.decompress(
      decodeURIComponent(encodedParameter),
      { inputEncoding: 'Base64' },
    );

    parameter = JSON.parse(json);
  } catch (error) {
    parameter = null;
  }

  return parameter;
};

const encodeParameter = (parameter) => {
  let encodedParameter;

  try {
    const json = JSON.stringify(parameter);

    encodedParameter = encodeURIComponent(LZUTF8.compress(json, { outputEncoding: 'Base64' }));
  } catch (error) {
    encodedParameter = '';
  }

  return encodedParameter;
};

export const ConfigProvider = ({ children }) => {
  const {
    applicationIds,
    regions,
    minDate,
    maxDate,
    commodities,
    projectTypes,
    statuses,
    contentTypes,
  } = useAPI();
  const reducer = useMemo(
    () => getReducer(
      applicationIds,
      regions,
      minDate,
      maxDate,
      commodities,
      projectTypes,
      statuses,
      contentTypes,
    ), [
      applicationIds,
      regions,
      minDate,
      maxDate,
      commodities,
      projectTypes,
      statuses,
      contentTypes,
    ],
  );
  const [isUpdating, setIsUpdating] = useState(true);
  const [config, configDispatch] = useReducer(reducer, initialState);
  const updateStateFromURL = useCallback((location) => {
    const query = queryString.parse(location.search);
    const startDate = query.startDate ? toDateOnly(query.startDate) : null;
    const endDate = query.endDate ? toDateOnly(query.endDate) : null;
    const searchIndex = parseInt(query.searchIndex, 10);
    const cartIndex = parseInt(query.cartIndex, 10);
    const fragment = location.hash ? location.hash.substring(1) : '';

    if (query.cartIds) {
      // Due to IIS URL length limits cart IDs require a integer specific compression
      const ids = JSON.stringify(decompress(query.cartIds).map((id) => id.toString()));

      localStorage.setItem('cartIds', ids);
      localStorage.setItem('unreadCartIds', ids);
    }

    setIsUpdating(true);
    configDispatch({
      type: 'changed',
      payload: {
        page: query.page,
        search: decodeParameter(query.search),
        applicationIds: decodeParameter(query.applicationIds),
        regions: query.regions?.split(','),
        startDate,
        endDate,
        commodities: query.commodities?.split(','),
        projectTypes: query.projectTypes?.split(','),
        statuses: query.statuses?.split(','),
        contentTypes: query.contentTypes?.split(','),
        treemapApplicationIds: decodeParameter(query.treemapApplicationIds),
        topics: query.topics?.split(','),
        filter: query.filter,
        searchIndex,
        cartIndex,
        fragment,
        cartIds: JSON.parse(localStorage.getItem('cartIds')),
        unreadCartIds: JSON.parse(localStorage.getItem('unreadCartIds')),
      },
    });
  }, [configDispatch]);
  const search = useMemo(() => {
    const queryParameters = parameters.map(
      (parameter) => `${parameter}=${config[parameter] || ''}`,
    );
    const dateQueryParameters = dateParameters.map(
      (parameter) => `${parameter}=${toDateOnlyString(config[parameter])}`,
    );
    const delimitedQueryParameters = delimitedParameters.map(
      (parameter) => `${parameter}=${config[parameter]?.join(',') || ''}`,
    );
    const encodedQueryParameters = encodedParameters.map(
      (parameter) => `${parameter}=${encodeParameter(config[parameter])}`,
    );
    const allQueryParameters = queryParameters.concat(
      dateQueryParameters,
      delimitedQueryParameters,
      encodedQueryParameters,
    );

    return `?${allQueryParameters.join('&')}`;
  }, [config]);

  useEffect(() => {
    if (isUpdating) {
      return;
    }

    localStorage.setItem('cartIds', JSON.stringify(config.cartIds));
    localStorage.setItem('unreadCartIds', JSON.stringify(config.unreadCartIds));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.cartIds, config.unreadCartIds]);

  useEffect(() => {
    // Allow local storage and URL update hooks to be ran before resetting the flag
    if (isUpdating) {
      setIsUpdating(false);

      return;
    }

    history.push({
      pathname: history.location.pathname,
      search,
      hash: config.fragment ? `#${config.fragment}` : '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, config.fragment]);

  useEffect(() => {
    unlistenHistory();
    updateStateFromURL(history.location);

    unlistenHistory = history.listen((event) => {
      if (event.action === 'POP') {
        updateStateFromURL(event.location);
      }
    });
  }, [updateStateFromURL]);

  return (
    <ConfigContext.Provider value={{ config, configDispatch }}>
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = { children: PropTypes.node };

ConfigProvider.defaultProps = { children: null };

export default () => useContext(ConfigContext);
