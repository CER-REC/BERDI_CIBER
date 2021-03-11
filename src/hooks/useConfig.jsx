import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import LZUTF8 from 'lzutf8';
import queryString from 'query-string';

import { initialState, getReducer } from './reducer';
import useAPI from './useAPI';
import { NOOP } from '../utilities/parseData';

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
    // Reset to local time midnight to avoid mismatches due to timezones
    const startDate = query.startDate ? new Date(`${query.startDate}T00:00:00`) : null;
    const endDate = query.endDate ? new Date(`${query.endDate}T00:00:00`) : null;
    const searchIndex = parseInt(query.searchIndex, 10);

    configDispatch({ type: 'page/changed', payload: query.page });
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
  }, [configDispatch]);

  /**
   * Update the URL if the control setting is modified.
   */
  useEffect(() => {
    const queryParameters = parameters.map(
      (parameter) => `${parameter}=${config[parameter] || ''}`,
    );
    // TODO: Move all date time resets to utility functions
    const dateQueryParameters = dateParameters.map(
      (parameter) => `${parameter}=${config[parameter] ? config[parameter].toJSON().substring(0, 10) : ''}`,
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
