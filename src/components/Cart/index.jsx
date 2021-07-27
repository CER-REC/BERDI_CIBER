import React from 'react';
import { Drawer, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

// TODO: will we need utilities/analytics here?

const useStyles = makeStyles(() => ({
  root: {
    width: '30em',
    height: '90%',
  },
  header: {
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
        <Grid>
          header
        </Grid>
        <Grid>
          body
        </Grid>
        <Grid>
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
