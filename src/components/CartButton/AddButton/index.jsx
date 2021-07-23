import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import Plus from '../../../images/cartButton/plus.svg';
import styles from '../styles';

const useStyles = makeStyles(styles);

const AddButton = ({ cartId }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => configDispatch({ type: 'cartIds/added', payload: cartId });

  return (
    <Button className={`CartButton ${classes.root} ${classes.add}`} onClick={handleClick}>
      <img alt="Plus" src={Plus} />
      {intl.formatMessage({ id: 'components.cartButton.add' })}
    </Button>
  );
};

AddButton.propTypes = {
  cartId: PropTypes.string.isRequired,
};

export default AddButton;
