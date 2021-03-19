import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import LZUTF8 from 'lzutf8';
import queryString from 'query-string';

import { toDateOnly, toDateOnlyString } from '../utilities/date';
import { NOOP } from '../utilities/parseData';
import { initialState, getReducer } from './reducer';
import useAPI from './useAPI';

const parameters = ['page', 'sort', 'searchIndex'];
const dateParameters = ['startDate', 'endDate'];
const delimitedParameters = ['regions', 'commodities', 'projectTypes', 'statuses'];
const encodedParameters = ['searches', 'applicationNames'];
const history = createBrowserHistory();
const ConfigContext = createContext();

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
    contentTypes,
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
      contentTypes[0],
    ),
    [
      applicationNames,
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
  /**
   * URL parachuting.
   */
  useEffect(() => {
    const query = queryString.parse(history.location.search);
    const startDate = query.startDate ? toDateOnly(query.startDate) : null;
    const endDate = query.endDate ? toDateOnly(query.endDate) : null;
    const searchIndex = parseInt(query.searchIndex, 10);

    configDispatch({
      type: 'searches/changed',
      payload: decodeParameter(query.searches),
    });
    configDispatch({
      type: 'applicationNames/changed',
      payload: decodeParameter(query.applicationNames),
    });
    configDispatch({ type: 'regions/changed', payload: query.regions?.split(',') });
    configDispatch({ type: 'startDate/changed', payload: startDate });
    configDispatch({ type: 'endDate/changed', payload: endDate });
    configDispatch({ type: 'commodities/changed', payload: query.commodities?.split(',') });
    configDispatch({ type: 'projectTypes/changed', payload: query.projectTypes?.split(',') });
    configDispatch({ type: 'statuses/changed', payload: query.statuses?.split(',') });
    configDispatch({ type: 'sort/changed', payload: query.sort });
    configDispatch({ type: 'searchIndex/changed', payload: searchIndex });
    // Dispatch the page last since the search will change the page
    configDispatch({ type: 'page/changed', payload: query.page });
  }, [configDispatch]);

  /**
   * Update the URL if the control setting is modified.
   */
  useEffect(() => {
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

    history.replace({
      pathname: history.location.pathname,
      search: `?${allQueryParameters.join('&')}`,
    });
  }, [config]);

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
