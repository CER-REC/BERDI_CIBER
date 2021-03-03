import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';
import parseData from './parseData';
// import useConfig from './useConfig';

const getQuery = (queryString) => {
  switch (queryString) {
    case 'applications':
      return queries.APPLICATIONS;
    default:
      return queries.NULL_QUERY;
  }
};

export default (queryString, variables = {}) => {
  // const { config } = useConfig();
  const query = getQuery(queryString, { variables });

  const { loading, error, data } = useQuery(query);

  if (queryString === 'applications') {
    return parseData(data?.applications);
  }

  return { loading, error, data };
};
