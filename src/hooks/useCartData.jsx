import { useQuery } from '@apollo/react-hooks';
import { CART_ITEMS } from './queries';

export default (cartIds) => {
  const { loading, error, data } = useQuery(CART_ITEMS, {
    variables: {
      cartIds,
    },
    skip: !cartIds.length,
  });

  return {
    loading,
    error,
    cartItems: data?.contents || [],
  };
};
