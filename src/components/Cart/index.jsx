import React, { useState } from 'react';
import { Button, Drawer, Grid, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// TODO: will we need utilities/analytics here?

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#D2EDEB',
    position: 'fixed',
    right: 0,
    top: '50%',
  },
  drawer: {
    width: '30em',
    height: '92%',
    flexGrow: 1,
  },
  header: {
    minHeight: '10%',
    backgroundColor: '#D2EDEB',
    borderBottom: '8px solid #66C8C3',
  },
  closeButton: {
    textAlign: 'right',
  },
  body: {
    minHeight: '65%',
    borderBottom: '8px solid #66C8C3',
    overflowY: 'auto',
  },
  footer: {
    minHeight: '25%',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    (!open && (
      <Button className={classes.button} onClick={handleOpen} variant="contained">
        <Grid container justifyContent="space-between" alignItems="center">
          {/* TODO: show shelf icon */}
          <Grid item xs={6}>
            icon
          </Grid>
          {/* TODO: show cart item count label */}
          <Grid item xs={6}>
            label
          </Grid>
        </Grid>
      </Button>
    ))
    || (
      <Drawer
        anchor="right"
        open={open}
        classes={{ paper: classes.drawer }}
        BackdropProps={{ invisible: true }}
      >
        <Grid container alignItems="center" justifyContent="space-between" className={classes.header}>
          <Grid item xs={6} />
          <Grid item xs={3} />
          <Grid item xs={3} className={classes.closeButton}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          body
        </Grid>
        <Grid container className={classes.footer}>
          footer
          {/* TODO: show disclaimer and download button */}
        </Grid>
      </Drawer>
    )
  );
};

export default Cart;
