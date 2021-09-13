import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useConfig from './useConfig';
import { CART_ITEMS } from './queries';

export default () => {
  const { config: { cartIds } } = useConfig();
  const { data } = useQuery(CART_ITEMS, {
    variables: {
      cartIds,
    },
    skip: !cartIds.length,
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line no-param-reassign
      data.contents.forEach((contentItem) => { contentItem.thumbnailURL = `https://picsum.photos/id/${Math.round(Math.random() * 100)}/200/100`; });
    }
  }, [data]);

  return {
    cartItems: data?.contents || [],
  };
};
