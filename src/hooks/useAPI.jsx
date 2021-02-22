import { useQuery } from '@apollo/react-hooks';

import { CONFIGURATION } from './queries';

export default () => {
  const { loading, error, data } = useQuery(CONFIGURATION);

  return { loading, error, data };
};

