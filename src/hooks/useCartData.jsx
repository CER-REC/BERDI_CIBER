import { useQuery } from '@apollo/react-hooks';
import useConfig from './useConfig';
import { CART_ITEMS } from './queries';

export default () => {
  const { config } = useConfig();
  const { data } = useQuery(CART_ITEMS, {
    variables: {
      cartIds: config.cartIds,
    },
  });
  return {
    cartItems: data?.contents || [],
  };
};
