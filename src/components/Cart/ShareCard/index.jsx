import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonBase, Grid, IconButton, makeStyles, Typography, Card, Divider, Snackbar,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';

const useStyles = makeStyles(styles);

const ShareCard = ({ open, cartURL, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleCopyCartURL = () => {
    navigator.clipboard.writeText(cartURL);
    setSnackbarOpen(true);
    setCopySuccess(true);
  };

  useEffect(() => {
    setCopySuccess(false);
  }, [cartURL]);

  return (open && (
    <Card className={classes.shareCard} elevation={2}>
      <Grid container direction="column">

        {/* Close button header */}
        <Grid item style={{ textAlign: 'right', height: '2em' }}>
          <IconButton
            onClick={() => { onClose(); setCopySuccess(false); }}
            style={{ width: '30px', height: '30px' }}
          >
            <CloseIcon style={{ fontSize: '16px' }} />
          </IconButton>
        </Grid>

        {/* Card body */}
        <Grid container spacing={2} style={{ padding: '0.5em 1em' }}>
          <Grid item xs={8}>
            <Button className={classes.shareCardCopyButton} onClick={handleCopyCartURL}>
              <Typography variant="body2" noWrap>
                {cartURL}
              </Typography>
            </Button>
          </Grid>
          <Grid container alignItems="center" item xs={4}>
            <ButtonBase disableRipple disableTouchRipple onClick={handleCopyCartURL}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {intl.formatMessage({ id: 'components.cart.copyLink' })}
              </Typography>
            </ButtonBase>
            {copySuccess && (<DoneIcon className={classes.doneIcon} />)}
          </Grid>
        </Grid>
        <Divider style={{ margin: '0 1em' }} />
        <Grid item style={{ padding: '1em 1em 0.5em' }}>
          <Typography className={classes.shareDisclaimer}>
            {intl.formatMessage({ id: 'components.cart.shareDisclaimer' })}
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
  cartURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareCard;
