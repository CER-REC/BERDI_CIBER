import React from 'react';
import { Drawer, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

// TODO: will we need utilities/analytics here?

const useStyles = makeStyles(() => ({
  root: {
    width: '30em',
    height: '90%',
  },
}));

const Cart = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        classes={{ paper: classes.root }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          header
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          body
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          footer
        </Grid>
      </Drawer>
    </div>
  );
};

Cart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
