import { useQuery } from '@apollo/react-hooks';
import { DOWNLOADSIZE } from './queries';

export default (ids) => {
  const { data } = useQuery(DOWNLOADSIZE, {
    variables: {
      ids,
    },
  });
  return {
    fileSize: data?.download.fileSize,
  };
};
