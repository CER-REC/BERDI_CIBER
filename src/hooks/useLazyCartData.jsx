import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import useConfig from './useConfig';
import { CART_ITEMS } from './queries';

const cache = {};
const isContentLoaded = (id) => !!cache[id];

export default () => {
  const { config: { cartIds } } = useConfig();
  const [getContents, { data }] = useLazyQuery(CART_ITEMS);
  const loadContents = useCallback((ids) => {
    const unloadedIds = ids.filter((id) => !isContentLoaded(id));

    if (!unloadedIds.length) {
      return;
    }

    getContents({ variables: { cartIds: unloadedIds } });
  }, [getContents]);

  if (data) {
    data.contents.forEach((content) => {
      cache[content.id] = content;
    });
  }

  return {
    cartItems: cartIds.map((id) => cache[id]),
    isContentLoaded,
    loadContents,
  };
};
