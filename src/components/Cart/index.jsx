import React, { useState, useRef } from 'react';
import { Button, Drawer, Grid, IconButton, Icon, makeStyles, Typography, Card, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import { useIntl } from 'react-intl';
import downloadIcon from '../../images/Download.svg';
import shelfIcon from '../../images/cart/shelf.svg';
import useDownloadSize from '../../hooks/useDownloadSize';
import useConfig from '../../hooks/useConfig';
import fileSizeFormatter from '../../utilities/fileSizeFormatter';
import styles from './styles';

const useStyles = makeStyles(styles);

const Cart = () => {
  const classes = useStyles();
  const intl = useIntl();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [shareOpen, setShareOpen] = useState(false);
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);

  const formRef = useRef(null);
  const { config } = useConfig();

  const handleDownloadClick = () => {
    formRef.current.submit();
  };

  const cartQuantity = (() => {
    const quantity = config.cartIds.length;
    return (quantity >= 1000)
      ? `${Number((quantity / 1000).toFixed(1)).toLocaleString(intl.locale)}k`
      : quantity;
  })();

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
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={6}>
            <Icon style={{ overflow: 'visible' }}>
              <img src={shelfIcon} alt="a shelf holding books" style={{ maxWidth: '1.6em' }} />
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.cartButtonLabel}>
              {cartQuantity}
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
          <Grid container direction="column" item xs={9}>
            <Typography className={classes.headerQuantity}>
              {`(${cartQuantity}) ${intl.formatMessage({ id: 'components.cart.headerQuantity' })}`}
            </Typography>
            <a href="stub" className={classes.headerLink}>
              {intl.formatMessage({ id: 'components.cart.viewFullList' })}
            </a>
          </Grid>
          <Grid item container xs={3} className={classes.headerButtons}>
            <IconButton aria-label="share" onClick={handleShareOpen}>
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon style={{ transform: 'scale(1.25)' }} />
            </IconButton>
          </Grid>

          {/* Share Card */}
          <Card className={(shareOpen) ? classes.shareCard : classes.shareCardClosed} elevation={2}>
            <Grid container direction="column">
              <Grid item style={{ textAlign: 'right', height: '3vh' }}>
                <IconButton aria-label="close share window" onClick={handleShareClose} style={{ transform: 'scale(0.7)' }}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid container spacing={2} style={{ padding: '0.5em 1em' }}>
                <Grid item xs={8}>
                  <Button className={classes.shareCardCopyButton}>
                    the link here
                  </Button>
                </Grid>
                <Grid item xs={4} style={{ alignSelf: 'center' }}>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    {intl.formatMessage({ id: 'components.cart.copyLink' })}
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ margin: '0 1em' }} />
              <Grid item style={{ padding: '1.5em 1em 0.5em' }}>
                <Typography style={{ fontSize: '12px', fontStyle: 'italic' }}>
                  {intl.formatMessage({ id: 'components.cart.shareDisclaimer' })}
                </Typography>
              </Grid>
            </Grid>
          </Card>
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
            <Typography className={classes.disclaimerText}>
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
            <Typography className={classes.disclaimerText}>
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
