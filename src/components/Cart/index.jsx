import React, { useState, useRef } from 'react';
import { Button, Drawer, Grid, IconButton, Icon, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import downloadIcon from '../../images/Download.svg';
import shelfIcon from '../../images/listPanel/shelf/shelf.svg';
import useDownloadSize from '../../hooks/useDownloadSize';
import useConfig from '../../hooks/useConfig';
import fileSizeFormatter from '../../utilities/fileSizeFormatter';

const useStyles = makeStyles(() => ({
  cartButton: {
    backgroundColor: '#D2EDEB',
    position: 'fixed',
    right: 0,
    top: '50%',
    zIndex: '1',
    '& .MuiTypography-root': {
      color: '#07456B',
      fontSize: '10pt',
      fontWeight: '900',
    },
  },
  drawer: {
    width: '28em',
  },
  closeButton: {
    textAlign: 'right',
  },
  header: {
    backgroundColor: '#D2EDEB',
    borderBottom: '8px solid #66C8C3',
  },
  body: {
    borderBottom: '8px solid #66C8C3',
    overflowY: 'auto',
    height: '100%',
  },
  footerDisclaimer: {
    backgroundColor: '#F7F7FB',
    margin: '1em',
    padding: '1em',
    textAlign: 'center',
    '& .MuiTypography-root': {
      fontSize: '10pt',
    },
  },
  footerDownloadButton: {
    marginBottom: '2em',
    backgroundColor: '#07456B',
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

  return (
    <>
      <Button className={classes.cartButton} onClick={handleOpen} variant="contained" size="small">
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Icon style={{ overflow: 'visible' }}>
              <img src={shelfIcon} alt="a shelf holding books" style={{ maxWidth: '1.5em' }} />
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography>
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
        >
          <Grid item className={classes.footerDisclaimer}>
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
          </Grid>
          <Grid item>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              className={classes.footerDownloadButton}
              onClick={handleDownloadClick}
              disabled={config.cartIds.length === 0}
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
