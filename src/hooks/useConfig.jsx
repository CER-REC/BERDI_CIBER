import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import LZUTF8 from 'lzutf8';
import queryString from 'query-string';

import { toDateOnly, toDateOnlyString } from '../utilities/date';
import { NOOP } from '../utilities/parseData';
import { initialState, getReducer } from './reducer';
import useAPI from './useAPI';

const parameters = ['page', 'searchIndex'];
const dateParameters = ['startDate', 'endDate'];
const delimitedParameters = ['regions', 'commodities', 'projectTypes', 'statuses'];
const encodedParameters = ['searches', 'applicationNames'];
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

export const ConfigProvider = ({ children, mockConfig, mockConfigDispatch }) => {
  const {
    applicationNames,
    regions,
    minDate,
    maxDate,
    commodities,
    projectTypes,
    statuses,
  } = useAPI();
  const reducer = useMemo(
    () => getReducer(
      applicationNames,
      regions,
      minDate,
      maxDate,
      commodities,
      projectTypes,
      statuses,
    ), [
      applicationNames,
      regions,
      minDate,
      maxDate,
      commodities,
      projectTypes,
      statuses,
    ],
  );
  const [config, configDispatch] = useReducer(reducer, initialState);
  const updateStateFromURL = useCallback((location) => {
    const query = queryString.parse(location.search);
    const startDate = query.startDate ? toDateOnly(query.startDate) : null;
    const endDate = query.endDate ? toDateOnly(query.endDate) : null;
    const searchIndex = parseInt(query.searchIndex, 10);

    updatingState = true;

    configDispatch({
      type: 'changed',
      payload: {
        page: query.page,
        searches: decodeParameter(query.searches),
        applicationNames: decodeParameter(query.applicationNames),
        regions: query.regions?.split(','),
        startDate,
        endDate,
        commodities: query.commodities?.split(','),
        projectTypes: query.projectTypes?.split(','),
        statuses: query.statuses?.split(','),
        searchIndex,
      },
    });
  }, [configDispatch]);

  useEffect(() => {
    // Don't update the URL if we're currently updating the state
    if (updatingState) {
      updatingState = false;

      return;
    }

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

    history.push({
      pathname: history.location.pathname,
      search: `?${allQueryParameters.join('&')}`,
    });
  }, [config]);

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
    <ConfigContext.Provider
      value={mockConfig
        ? { config: mockConfig, configDispatch: mockConfigDispatch }
        : { config, configDispatch }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  children: PropTypes.node,
  mockConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  mockConfigDispatch: PropTypes.func,
};

ConfigProvider.defaultProps = {
  children: null,
  mockConfig: undefined,
  mockConfigDispatch: NOOP,
};

export default () => useContext(ConfigContext);
