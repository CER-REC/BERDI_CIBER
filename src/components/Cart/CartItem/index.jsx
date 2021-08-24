import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, IconButton, Typography, ButtonBase,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid gray',
  },
  header: {
    justifyContent: 'space-between',
  },
}));

const CartItem = ({ id }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();

  const handleRemoveItem = () => {
    configDispatch({ type: 'cartIds/removed', payload: id });
  };

  return (
    <Grid container item className={classes.root}>
      <Grid container item className={classes.header}>
        <Typography>
          item title
        </Typography>
        <IconButton onClick={handleRemoveItem}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <ButtonBase>
          View more details
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CartItem;
