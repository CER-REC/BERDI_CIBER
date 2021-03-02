import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';
import parseData from './parseData';

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

// eslint-disable-next-line no-unused-vars
export default (queryString, variables = {}) => {
  const query = getQuery(queryString, { variables });

  const { loading, error, data } = useQuery(query);

  if (queryString === 'applications') {
    return parseData(data?.applications);
  }

  // const processedData = parseData(data?.applications);

  return { loading, error, data };
};
