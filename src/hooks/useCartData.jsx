import { useQuery } from '@apollo/react-hooks';
import { CART_ITEMS } from './queries';
import useConfig from './useConfig';

const getPaginationInfo = (queryOffset, amountToLoad, idsLength) => {
  let endIndex = queryOffset + amountToLoad;
  const hasNextPage = endIndex < idsLength;
  if (!hasNextPage) endIndex = idsLength;
  return {
    endIndex,
    hasNextPage,
  };
};

export default (queryOffset, amountToLoad, updateLoadedItems) => {
  const { config: { cartIds } } = useConfig();

  // TODO: ensure that slice isn't rerendering if nothing changes;
  // if rerenders are happening, memoize the cart id chunks (useMemo on the sliced id array)
  // TODO: ensure that the amount of ids is clamped <= length
  // modify hasNextPage = false when there are no more elemnts to grab (no more pages)
  //  if queryOffset + amountToLoad >= config.cartIds.length, no more pages

  const { endIndex, hasNextPage } = getPaginationInfo(queryOffset, amountToLoad, cartIds.length);
  const idChunk = cartIds.slice(queryOffset, endIndex);
  console.log(`initial query: slicing ${queryOffset} to ${endIndex} (${cartIds.length})\n`);

  const { loading, error, data, fetchMore } = useQuery(CART_ITEMS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      cartIds: idChunk,
    },
    skip: !cartIds.length,
  });

  if (loading && !data) return { loading, cartItems: [] };

  const loadMore = () => fetchMore({
    query: CART_ITEMS,
    notifyOnNetworkStatusChange: true,
    variables: {
      cartIds: idChunk,
    },
    skip: !cartIds.length,
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!previousResult || !fetchMoreResult) return;
      console.log(fetchMoreResult.contents, previousResult.contents);
      updateLoadedItems([...fetchMoreResult.contents, ...previousResult.contents]);
    },
  });

  return {
    loadMore,
    hasNextPage,
    loading,
    error,
    cartItems: data?.contents || [],
  };
};
