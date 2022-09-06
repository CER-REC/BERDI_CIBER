import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import plus from '../../../images/cartButton/plus.svg';
import { reportCartAdd } from '../../../utilities/analytics';
import styles from '../styles';

const useStyles = makeStyles(styles);

const AddButton = ({ data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => {
    configDispatch({ type: 'cartIds/added', payload: data.id });
    reportCartAdd(data.title);
  };

  return (
    <Button aria-label={intl.formatMessage({ id: 'components.cartButton.add' })} className={`CartButton ${classes.root} ${classes.add}`} onClick={handleClick}>
      <img alt={intl.formatMessage({ id: 'components.cartButton.addAltText' })} src={plus} />
      <Typography className={classes.buttonText}>
        {intl.formatMessage({ id: 'components.cartButton.add' })}
      </Typography>
    </Button>
  );
};

AddButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddButton;
