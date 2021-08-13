import { useQuery } from '@apollo/react-hooks';
import { DOWNLOAD_SIZE } from './queries';

export default (ids) => {
  const { data } = useQuery(DOWNLOAD_SIZE, {
    variables: {
      ids,
    },
  });
  return {
    fileSize: data?.download.fileSize,
  };
};
