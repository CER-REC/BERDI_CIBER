import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel, FormLabel, Grid,
  IconButton, InputBase, makeStyles, Radio, RadioGroup, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import hands from '../../../images/searchActionResults/hands.svg';
import styles from './styles';

const CREATE_REPORT = gql`
  mutation($id: ID!, $concern: String!, $details: String) {
    createReportFeedback(report: { id: $id, concern: $concern, details:$details } )
  }
`;

const useStyles = makeStyles(styles);

const ReportDataDialog = ({ title, open, onClose, contentId }) => {
  const intl = useIntl();
  const classes = useStyles();

  const [otherConcern, setOtherConcern] = useState();
  const [details, setDetails] = useState();
  const [selection, setSelection] = useState();
  const [createReport, { data, error }] = useMutation(CREATE_REPORT);

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  const getConcern = () => {
    switch (selection) {
      case intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.strangeChars' }):
      case intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.noData' }):
        return selection;
      default:
        return otherConcern || null;
    }
  };

  const handleSubmit = (event) => {
    createReport({
      variables: {
        id: contentId,
        concern: getConcern(),
        details,
      },
    });
    event.preventDefault();
  };

  const handleClose = () => {
    onClose();
  };

  const SubmissionMessage = () => (
    <Grid container justify="center" className={classes.submitted}>
      {(data && !data.createReportFeedback) || error ? (
        <>
          <Typography variant="h6">{intl.formatMessage({ id: 'common.errorMessage' })}</Typography>
          <Typography variant="h6" style={{ fontWeight: 'normal' }}>{intl.formatMessage({ id: 'components.searchActionResults.tryAgainLater' })}</Typography>
        </>
      ) : (
        <>
          <Typography variant="h6">{intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.thankYou' })}</Typography>
          <Typography variant="h6" style={{ fontWeight: 'normal' }}>{intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.flagged' })}</Typography>
        </>
      )}
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
      <Grid container className={classes.root}>
        <Grid item container className={classes.titleSection}>

          <Grid container direction="row">
            <Grid item xs={11} style={{ padding: '0.5em 0' }}>
              <Typography variant="h6">{intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.report' })}</Typography>

              <Grid item>
                <Typography>
                  {title}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <IconButton aria-label={intl.formatMessage({ id: 'common.closeAltText' })} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {(!data?.createReportFeedback && !error) ? (
          // Form unsubmitted
          <Grid item className={classes.body}>
            <Grid container item justify="flex-end">
              <Grid item className={classes.requiredText}>
                <span>* </span>
                {intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.required' })}
              </Grid>
            </Grid>

            <Grid item>
              <Grid item style={{ padding: '0 2em 1em' }}>
                <form>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.formLabel}>
                      {intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.whatConcern' })}
                      <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <RadioGroup className={classes.radioGroup} aria-label="concern" name="concern" onChange={handleChange}>
                      <FormControlLabel value={intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.strangeChars' })} control={<Radio color="primary" />} label={intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.strangeChars' })} />
                      <FormControlLabel value={intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.noData' })} control={<Radio color="primary" />} label={intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.noData' })} />
                      <FormControlLabel value="other" control={<Radio color="primary" />} label={intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.other' })} />
                      <InputBase onChange={(e) => setOtherConcern(e.target.value.trim())} className={classes.otherText} disabled={selection !== 'other'} name="otherText" />
                    </RadioGroup>
                  </FormControl>

                  <FormControl className={classes.moreDetail}>
                    <p>
                      {intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.explainMore' })}
                      <sup>
                        {` (${intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.optional' })})`}
                      </sup>
                    </p>
                    <InputBase onChange={(e) => setDetails(e.target.value)} style={{ paddingLeft: '0.4em' }} multiline rowsMin={4} type="text" name="explanation" rows="3" cols="20" />
                    <Typography variant="body2">
                      {intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.disclaimer' }, {
                        terms: (
                          <a
                            href={intl.formatMessage({ id: 'common.limitationsURL' })}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {intl.formatMessage({ id: 'common.termsAndConditions' })}
                          </a>
                        ),
                      })}
                    </Typography>
                  </FormControl>

                  <Button
                    // If there is no concern value, disable the button
                    disabled={!getConcern()}
                    type="submit"
                    className={!getConcern() ? classes.disabledButton : classes.button}
                    onClick={handleSubmit}
                  >
                    {intl.formatMessage({ id: 'components.searchActionResults.reportDataDialog.submit' })}
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        ) : <SubmissionMessage />}
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
