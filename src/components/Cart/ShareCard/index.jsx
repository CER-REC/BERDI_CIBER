import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, IconButton, makeStyles, Typography, Card, Divider, Snackbar, TextField,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { compress } from 'int-compress-string';
import useConfig from '../../../hooks/useConfig';
import { reportCartShare } from '../../../utilities/analytics';
import styles from './styles';

const useStyles = makeStyles(styles);

const ShareCard = ({ open, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { config } = useConfig();
  const isEmpty = config.cartIds.length === 0;

  // Slicing cardIds since compress modifies the provided array
  const cartURL = `${window.location.origin}${window.location.pathname}?cartIds=${compress(config.cartIds.slice())}&isCartOpen=1&page=search`;

  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleCopyCartURL = () => {
    navigator.clipboard.writeText(cartURL);
    setSnackbarOpen(true);
    setCopySuccess(true);
    reportCartShare();
  };
  const handleClose = () => {
    onClose();
    setCopySuccess(false);
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setCopySuccess(false);
  }, [cartURL]);

  return (open && (
    <Card className={classes.shareCard} elevation={2}>
      <Grid container direction="column">

        {/* Close button header */}
        <Grid item style={{ textAlign: 'right', height: '1.5em' }}>
          <IconButton
            aria-label={intl.formatMessage({ id: 'common.closeAltText' })}
            onClick={handleClose}
            style={{ width: '30px', height: '30px' }}
          >
            <CloseIcon style={{ fontSize: '16px' }} />
          </IconButton>
        </Grid>

        {/* Card body */}
        <Grid container spacing={2} style={{ padding: '0.5em 1em' }}>
          <Grid item xs={8}>
            <TextField
              InputProps={{ className: classes.shareCardTextbox }}
              value={isEmpty ? intl.formatMessage({ id: 'components.cart.noItems' }) : cartURL}
              fullWidth
              disabled
            />
          </Grid>
          <Grid container alignItems="center" item xs={4}>
            <Button
              color="primary"
              onClick={handleCopyCartURL}
              disableFocusRipple
              disabled={isEmpty}
            >
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {intl.formatMessage({ id: 'components.cart.copyLink' })}
              </Typography>
            </Button>
            {copySuccess && (<DoneIcon className={classes.doneIcon} />)}
          </Grid>
        </Grid>
        <Divider style={{ margin: '0 1em' }} />
        <Grid item style={{ padding: '1em 1em 0.5em' }}>
          <Typography className={classes.shareDisclaimer}>
            { isEmpty ? intl.formatMessage({ id: 'components.cart.shareNoItems' }) : intl.formatMessage({ id: 'components.cart.shareDisclaimer' })}
          </Typography>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
          message={intl.formatMessage({ id: 'components.cart.copyConfirmation' })}
          onClose={handleSnackbarClose}
          ContentProps={{ classes: { root: classes.shareSnackbar } }}
          className={classes.shareSnackbar}
        />
      </Grid>
    </Card>
  ));
};

ShareCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareCard;
