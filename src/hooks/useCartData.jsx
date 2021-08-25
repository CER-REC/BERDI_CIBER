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
  return {
    cartItems: data?.contents || [],
  };
};
