import React from 'react';
import { Drawer, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

// TODO: will we need utilities/analytics here?

const useStyles = makeStyles(() => ({
  root: {
    width: '30em',
    height: '92%',
    flexGrow: 1,
  },
  header: {
    minHeight: '10%',
    backgroundColor: '#D2EDEB',
    borderBottom: '8px solid #66C8C3'
  },
  body: {
    minHeight: '65%',
    borderBottom: '8px solid #66C8C3',
    overflowY: 'scroll',
  },
  footer: {
    minHeight: '25%',
  }
}));

const Cart = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <Grid container className={classes.header}>
        header
      </Grid>
      <Grid container className={classes.body}>
        body
      </Grid>
      <Grid container className={classes.footer}>
        footer
      </Grid>
    </Drawer>
  );
};

Cart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
