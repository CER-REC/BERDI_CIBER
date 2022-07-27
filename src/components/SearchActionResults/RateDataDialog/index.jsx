import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Dialog,
  Grid,
  IconButton, makeStyles, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import hands from '../../../images/searchActionResults/hands.svg';
import LeafRating from '../LeafRating';
import styles from './styles';

const CREATE_RATING = gql`
  mutation($id: ID!, $score: Int!) {
    createRatingFeedback(rating: { id: $id, score: $score } )
  }
`;

const useStyles = makeStyles(styles);

const ReportDataDialog = ({ title, open, onClose, contentId }) => {
  const intl = useIntl();
  const classes = useStyles();

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(-1);
  const [createRating, { data, error }] = useMutation(CREATE_RATING);

  const handleSubmit = () => {
    createRating({
      variables: {
        id: contentId,
        score: rating,
      },
    });
  };

  const handleClose = () => {
    onClose();
  };

  const SubmissionMessage = () => (
    <Grid container alignItems="center" direction="column" className={classes.submitted}>
      <Grid item container justify="center" style={{ padding: '0 2em' }}>
        {(data && !data.createRatingFeedback) || error ? (
          <>
            <Typography variant="h6">{intl.formatMessage({ id: 'common.errorMessage' })}</Typography>
            <Typography variant="h6" style={{ fontWeight: 'normal' }}>{intl.formatMessage({ id: 'components.searchActionResults.tryAgainLater' })}</Typography>
          </>
        ) : <Typography variant="h6">{intl.formatMessage({ id: 'components.searchActionResults.rateDataDialog.thankYou' })}</Typography>}
      </Grid>

      <Grid item className={classes.imageSection}>
        <img alt="two hands holding a plant" src={hands} />
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: { maxWidth: '480px' } }}
    >
      <Grid>
        <Grid container className={classes.titleSection}>

          <Grid container>
            <Grid item xs={11} style={{ padding: '0.5em 0' }}>
              <Typography variant="h6">{intl.formatMessage({ id: 'components.searchActionResults.rateDataDialog.rateData' })}</Typography>

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

        {(!data?.createRatingFeedback && !error) ? (
          <Grid className={classes.body}>
            <Grid container style={{ paddingLeft: '2em' }}>
              <Typography style={{ paddingTop: '1em', fontWeight: 300 }} variant="h6">{intl.formatMessage({ id: 'components.searchActionResults.rateDataDialog.useful' })}</Typography>
              <LeafRating rating={rating} onChangeActive={setHover} onChange={setRating} />
            </Grid>

            <Grid style={{ fontWeight: 700, paddingLeft: '2em' }}>
              {rating !== null && intl.formatMessage({ id: `components.searchActionResults.rateDataDialog.ratingLabels.${hover !== -1 ? hover : rating}` })}
            </Grid>

            <Grid container justify="flex-end">
              <Grid item style={{ padding: '0 1em 1em' }}>
                <Button
                  disabled={!rating}
                  className={!rating ? classes.disabledButton : classes.button}
                  onClick={handleSubmit}
                >
                  {intl.formatMessage({ id: 'components.searchActionResults.rateDataDialog.rate' })}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )
          : <SubmissionMessage />}
      </Grid>
    </Dialog>
  );
};

export default ReportDataDialog;

ReportDataDialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired,
};
