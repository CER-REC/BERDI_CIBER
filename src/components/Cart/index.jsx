import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

// TODO: will we need utilities/analytics here?

const useStyles = makeStyles(() => ({
  root: {
    width: '30em',
    height: '60%',
  },
}));

const Cart = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      className={classes.root}
    >
      drawer
    </Drawer>
  );
};

Cart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
