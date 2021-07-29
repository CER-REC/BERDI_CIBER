import React, { useState } from 'react';
import { Button, Drawer, Grid, IconButton, Icon, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import downloadIcon from '../../images/Download.svg';

// TODO: will we need utilities/analytics here?

const useStyles = makeStyles(() => ({
  cartButton: {
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
  footerDisclaimer: {
    backgroundColor: '#F7F7FB',
    margin: '1em',
    padding: '1em',
    textAlign: 'center',
    '& .MuiTypography-root': {
      fontSize: '10pt',
    },
    downloadButton: {
      backgroundColor: '#07456b',
    },
    downloadIcon: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    },
  },
}));

const Cart = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    (!open && (
      <Button className={classes.cartButton} onClick={handleOpen} variant="contained">
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

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.footer}
        >
          <div className={classes.footerDisclaimer}>
            <Typography>
              {intl.formatMessage(
                { id: 'components.cart.downloadDisclaimer' },
                {
                  limitationsURL: (
                    <a href={intl.formatMessage({ id: 'common.limitationsURL' })} target="_blank" rel="noopener noreferrer">
                      {intl.formatMessage({ id: 'common.limitations' })}
                    </a>
                  ),
                },
              )}
            </Typography>
            <Typography>
              {intl.formatMessage({ id: 'components.cart.dataDisclaimer' })}
            </Typography>
          </div>
          <Button disableElevation variant="contained">
            <Icon className={classes.downloadIcon}>
              <img
                src={downloadIcon}
                alt="download button"
              />
            </Icon>
            <span>{intl.formatMessage({ id: 'common.downloadAllTables' })}</span>
            <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>
              filesize
            </span>
          </Button>
        </Grid>
      </Drawer>
    )
  );
};

export default Cart;
