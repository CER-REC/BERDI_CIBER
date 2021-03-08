import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';

import { initialState, getReducer } from './reducer';
import { NOOP } from '../utilities/parseData';

const parameters = ['page', 'searches', 'applicationNames', 'regions', 'startDate', 'endDate', 'commodities', 'projectTypes', 'statuses', 'sort', 'first', 'offset'];
const history = createBrowserHistory();
const ConfigContext = createContext();

export const ConfigProvider = ({ children, mockConfig, mockConfigDispatch }) => {
  const reducer = useMemo(() => getReducer(), []);
  const [config, configDispatch] = useReducer(reducer, initialState);
  /**
   * URL parachuting.
   */
  useEffect(() => {
    const query = queryString.parse(history.location.search);

    configDispatch({ type: 'page/changed', payload: query.page });
    configDispatch({ type: 'searches/changed', payload: query.searches });
    configDispatch({ type: 'applicationNames/changed', payload: query.applicationNames });
    configDispatch({ type: 'regions/changed', payload: query.regions });
    configDispatch({ type: 'startDate/changed', payload: query.startDate });
    configDispatch({ type: 'endDate/changed', payload: query.endDate });
    configDispatch({ type: 'commodities/changed', payload: query.commodities });
    configDispatch({ type: 'projectTypes/changed', payload: query.projectTypes });
    configDispatch({ type: 'statuses/changed', payload: query.statuses });
    configDispatch({ type: 'sort/changed', payload: query.sort });
    configDispatch({ type: 'first/changed', payload: query.first });
    configDispatch({ type: 'offset/changed', payload: query.offset });
  }, [configDispatch]);

  /**
   * Update the URL if the control setting is modified.
   */
  useEffect(() => {
    const queryParameters = parameters.map(
      (parameter) => `${parameter}=${config[parameter] || ''}`,
    );

    history.replace({
      pathname: history.location.pathname,
      search: `?${queryParameters.join('&')}`,
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
