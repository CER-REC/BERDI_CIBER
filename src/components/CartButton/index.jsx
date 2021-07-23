import React from 'react';

import useConfig from '../../hooks/useConfig';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import UnavailableButton from './UnavailableButton';

const CartButton = ({ data }) => {
  const { config: { cartIds } } = useConfig();

  if (data.type !== 'TABLE') {
    return null;
  }

  if (!data.url) {
    return <UnavailableButton />;
  }

  if (cartIds.includes(data.id)) {
    return <RemoveButton cartId={data.id} />;
  }

  return <AddButton cartId={data.id} />;
};

export default CartButton;
