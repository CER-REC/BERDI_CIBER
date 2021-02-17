// import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';

export default (queryString) => {
  const query = queryString === 'configuration' ? queries.CONFIGURATION : queries.APPLICATIONS;

  const { loading, error, data } = useQuery(query);

  return { loading, error, data };
};
