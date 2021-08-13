import React, { useState, useRef } from 'react';
import { Button, Drawer, Grid, IconButton, Icon, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import downloadIcon from '../../images/Download.svg';
import shelfIcon from '../../images/cart/shelf.svg';
import useDownloadSize from '../../hooks/useDownloadSize';
import useConfig from '../../hooks/useConfig';
import fileSizeFormatter from '../../utilities/fileSizeFormatter';

const useStyles = makeStyles((theme) => ({
  cartButton: {
    backgroundColor: theme.palette.cart.light,
    position: 'fixed',
    right: 0,
    top: '50%',
    zIndex: '1',
  },
  newDot: {
    fill: '#D32645',
    strokeWidth: 0,
    position: 'relative',
    left: '40px',
    bottom: '4px',
  },
  newDotHidden: {
    visibility: 'hidden',
  },
  cartButtonLabel: {
    color: theme.palette.cart.dark,
    fontSize: '13px',
    fontWeight: '900',
  },
  drawer: {
    width: '28em',
  },
  closeButton: {
    textAlign: 'right',
  },
  header: {
    backgroundColor: theme.palette.cart.light,
    borderBottom: '8px solid',
    borderBottomColor: theme.palette.secondary.main,
  },
  body: {
    borderBottom: '8px solid',
    borderBottomColor: theme.palette.secondary.main,
    overflowY: 'auto',
    height: '100%',
  },
  footerDisabled: {
    opacity: 0.25,
    pointerEvents: 'none',
  },
  footer: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  footerDisclaimer: {
    backgroundColor: '#F7F7FB',
    margin: '1em',
    padding: '1em',
    textAlign: 'center',
  },
  footerDisclaimerText: {
    fontSize: '13px',
  },
  footerDownloadButton: {
    marginBottom: '2em',
    backgroundColor: theme.palette.cart.dark,
    padding: '0.3em 3em',
  },
  footerDownloadButtonIcon: {
    overflow: 'visible',
    paddingRight: '0.5em',
    maxWidth: '1.2em',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formRef = useRef(null);
  const { config } = useConfig();

  const handleDownloadClick = () => {
    formRef.current.submit();
  };

  let { fileSize } = useDownloadSize(config.cartIds);
  // TODO: remove this once API is updated to handle 0 sizes
  if (config.cartIds.length === 0) fileSize = 0;
  const formattedFileSize = fileSizeFormatter(fileSize);

  const newDotSize = 14;
  const newDotR = newDotSize / 2;

  return (
    <>
      <Button className={classes.cartButton} onClick={handleOpen} variant="contained" size="small">
        <svg
          height={newDotSize}
          width={newDotSize}
          viewBox={`0 0 ${newDotSize} ${newDotSize}`}
          className={(config.unreadCartIds.length === 0) ? classes.newDotHidden : classes.newDot}
        >
          <circle cx={newDotR} cy={newDotR} r={newDotR} />
        </svg>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Icon style={{ overflow: 'visible' }}>
              <img src={shelfIcon} alt="a shelf holding books" style={{ maxWidth: '1.5em' }} />
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.cartButtonLabel}>
              {config.cartIds.length}
            </Typography>
          </Grid>
        </Grid>
      </Button>
      <Drawer
        anchor="right"
        open={open}
        classes={{ paper: classes.drawer }}
        style={{ position: 'initial' }}
        disableScrollLock
        hideBackdrop
        disableEnforceFocus
      >
        {/* Header */}
        <Grid container alignItems="center" className={classes.header}>
          <Grid item xs={6} />
          <Grid item xs={3} />
          <Grid item xs={3} className={classes.closeButton}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Body */}
        <Grid container className={classes.body}>
          body
        </Grid>

        {/* Footer */}
        <Grid
          container
          direction="column"
          alignItems="center"
          className={(config.cartIds.length === 0) ? classes.footerDisabled : classes.footer}
        >
          <Grid item className={classes.footerDisclaimer}>
            <Typography className={classes.footerDisclaimerText}>
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
            <Typography className={classes.footerDisclaimerText}>
              {intl.formatMessage({ id: 'components.cart.dataDisclaimer' })}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              className={classes.footerDownloadButton}
              onClick={handleDownloadClick}
            >
              <form ref={formRef} method="post" action="zip" style={{ display: 'none' }}>
                <input type="hidden" name="ids" value={config.cartIds} />
              </form>
              <img src={downloadIcon} alt="download button" className={classes.footerDownloadButtonIcon} />
              <span>{intl.formatMessage({ id: 'common.downloadAllTables' })}</span>
              <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>
                {formattedFileSize}
              </span>
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default Cart;
