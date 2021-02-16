// import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';

export default () => {
  const { loading, error, data } = useQuery(queries.CONFIGURATION);

  return { loading, error, data };
};
