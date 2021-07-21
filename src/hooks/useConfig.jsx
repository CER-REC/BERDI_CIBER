import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import LZUTF8 from 'lzutf8';
import queryString from 'query-string';

import { toDateOnly, toDateOnlyString } from '../utilities/date';
import { initialState, getReducer } from './reducer';
import useAPI from './useAPI';

const parameters = ['page', 'searchIndex', 'cartIndex'];
const dateParameters = ['startDate', 'endDate'];
const delimitedParameters = ['regions', 'commodities', 'projectTypes', 'statuses', 'contentTypes'];
const encodedParameters = ['search', 'applicationIds', 'treemapApplicationIds'];
const history = createBrowserHistory();
const ConfigContext = createContext();
let updatingState = true;
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
  const [config, configDispatch] = useReducer(reducer, initialState);
  const updateStateFromURL = useCallback((location) => {
    const query = queryString.parse(location.search);
    const startDate = query.startDate ? toDateOnly(query.startDate) : null;
    const endDate = query.endDate ? toDateOnly(query.endDate) : null;
    const searchIndex = parseInt(query.searchIndex, 10);
    const cartIndex = parseInt(query.cartIndex, 10);
    const fragment = location.hash ? location.hash.substring(1) : '';

    updatingState = true;

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
    if (updatingState) {
      return;
    }

    localStorage.setItem('cartIds', JSON.stringify(config.cartIds));
    localStorage.setItem('unreadCartIds', JSON.stringify(config.unreadCartIds));
  }, [config.cartIds, config.unreadCartIds]);

  useEffect(() => {
    // Allow local storage and URL update hooks to be ran before resetting the flag
    if (updatingState) {
      updatingState = false;

      return;
    }

    history.push({
      pathname: history.location.pathname,
      search,
      hash: config.fragment ? `#${config.fragment}` : '',
    });
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
