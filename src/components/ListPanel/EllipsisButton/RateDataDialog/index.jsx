import {
  Button,
  Dialog,
  Grid,
  IconButton, makeStyles, Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import hands from '../../../../images/listPanel/hands.svg';
import styles from './styles';
import LeafRating from './LeafRating';

const useStyles = makeStyles(styles);

const ReportDataDialog = ({ title, open, onClose }) => {
  const intl = useIntl();
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const handleSubmit = () => {
    setSubmitted(true);
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ style: { maxWidth: '480px' } }}
    >
      <Grid container>
        <Grid item container className={classes.titleSection}>

          <Grid container direction="row">
            <Grid item xs={11} style={{ padding: '0.5em 0' }}>
              <Typography variant="h6">{intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rateDataDialog.rateData' })}</Typography>

              <Grid item>
                <Typography>
                  {title}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>

          </Grid>
        </Grid>
        {!submitted
          ? (
            <Grid item container className={classes.body}>
              <Grid container item justify="flex-start" style={{ paddingLeft: '2em' }}>
                <Typography style={{ paddingTop: '1em', fontWeight: 300 }} variant="h6">{intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rateDataDialog.useful' })}</Typography>
                <br />
                <LeafRating rating={rating} setHover={setHover} setRating={setRating} />
                <br />
              </Grid>

              <Grid item container justify="flex-start" style={{ fontWeight: 700, paddingLeft: '2em' }}>
                {rating !== null && intl.formatMessage({ id: `components.listPanel.ellipsisButton.rateDataDialog.ratingLabels.${hover !== -1 ? hover : rating}` })}
              </Grid>

              <Grid item container justify="flex-end" alignItems="center">
                <Grid item style={{ padding: '0 1em 1em' }}>
                  <Button
                    className={classes.button}
                    onClick={handleSubmit}
                  >
                    {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rateDataDialog.rate' })}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid container alignItems="center" justify="center" direction="column" className={classes.submitted}>
                <Grid item container justify="center" style={{ padding: '0 2em' }}>
                  <Typography variant="h6">{intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rateDataDialog.thankYou' })}</Typography>
                  <br />
                  <Typography variant="h6" style={{ fontWeight: 'normal', textAlign: 'center' }}>
                    {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rateDataDialog.timesRated' }, {
                      // TODO: these numbers can be swapped for whatever comes back from the API
                      num: '3',
                      ratingText: intl.formatMessage({ id: `components.listPanel.ellipsisButton.rateDataDialog.ratingLabels.${2}` }),
                    })}
                  </Typography>
                </Grid>

                <br />
                <Grid item className={classes.imageSection}>
                  <img alt="two hands holding a plant" src={hands} />
                </Grid>

                <Typography className={classes.bottomText}>
                  {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rateDataDialog.improve' })}
                </Typography>
              </Grid>
            </>
          )}
      </Grid>
    </Dialog>
  );
};

export default ReportDataDialog;

ReportDataDialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
