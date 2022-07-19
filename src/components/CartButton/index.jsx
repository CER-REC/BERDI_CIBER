import React from 'react';
import PropTypes from 'prop-types';

import useConfig from '../../hooks/useConfig';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

const CartButton = ({ data }) => {
  const { config: { cartIds } } = useConfig();

  if (cartIds.includes(data.id)) {
    return <RemoveButton data={data} />;
  }

  return <AddButton data={data} />;
};

CartButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default CartButton;
