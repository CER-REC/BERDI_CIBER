import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import minus from '../../../images/cartButton/minus.svg';
import styles from '../styles';

const useStyles = makeStyles(styles);

const RemoveButton = ({ cartId }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => configDispatch({ type: 'cartIds/removed', payload: cartId });

  return (
    <Button className={`CartButton ${classes.root} ${classes.remove}`} onClick={handleClick}>
      <img alt="Minus" src={minus} />
      {intl.formatMessage({ id: 'components.cartButton.remove' })}
    </Button>
  );
};

RemoveButton.propTypes = {
  cartId: PropTypes.string.isRequired,
};

export default RemoveButton;