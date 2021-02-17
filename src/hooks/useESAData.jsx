import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';

const getQuery = (queryString) => {
  switch (queryString) {
    case 'configuration':
      return queries.CONFIGURATION;
    case 'applications':
      return queries.APPLICATIONS;
    default:
      return queries.NULL_QUERY;
  }
};

export default (queryString) => {
  const query = getQuery(queryString);

  const { loading, error, data } = useQuery(query);

  return { loading, error, data };
};
