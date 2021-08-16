import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel, FormLabel, Grid,
  IconButton, InputBase, makeStyles, Radio, RadioGroup, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './styles';

const useStyles = makeStyles(styles);

const ReportDataDialog = ({ title, open, onClose }) => {
  const intl = useIntl();
  const classes = useStyles();

  const [selection, setSelection] = useState(null);
  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  const handleClose = () => {
    setSelection(null);
    onClose();
  };

  return (
    <Dialog
      className="LimitationsDialog"
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ style: { maxWidth: '480px' } }}
    >
      <Grid container style={{ color: '#434343' }}>
        <Grid item container className={classes.titleSection}>

          <Grid container direction="row">
            <Grid item xs={11} style={{ padding: '0.5em 0' }}>
              <Typography variant="h6">{intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.report' })}</Typography>
              {/* TODO: this will need to have a see more button associated with it */}
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

        <Grid item container className={classes.body}>
          <Grid container item justify="flex-end">
            <Grid item className={classes.requiredText}>
              <span>* </span>
              {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.required' })}
            </Grid>
          </Grid>

          <Grid item container direction="column" justify="center" alignItems="center">
            <Grid item style={{ padding: '0 2em 1em 2em' }}>
              <form>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className={classes.formLabel}>
                    {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.whatConcern' })}
                    <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <RadioGroup className={classes.radioGroup} aria-label="reason" name="reason" value={selection} onChange={handleChange}>
                    <FormControlLabel value="strange characters" control={<Radio color="primary" />} label={intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.strangeChars' })} />
                    <FormControlLabel value="data not in document" control={<Radio color="primary" />} label={intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.noData' })} />
                    <FormControlLabel value="other" control={<Radio color="primary" />} label={intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.other' })} />
                    <InputBase className={classes.otherText} disabled={selection !== 'other'} name="otherText" id="otherText" />
                  </RadioGroup>
                </FormControl>

                <br />
                <FormControl className={classes.moreDetail}>
                  <p>
                    {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.explainMore' })}
                    <sup>
                      {` (${intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.optional' })})`}
                    </sup>
                  </p>
                  <br />
                  <InputBase multiline rowsMin={4} type="text" name="explanation" id="explanation" rows="3" cols="20" />
                  <Typography variant="body2">
                    {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.disclaimer' }, {
                      terms: (
                        <a href={intl.formatMessage({ id: 'common.termsLink' })}>
                          {intl.formatMessage({ id: 'common.termsAndConditions' })}
                        </a>
                      ),
                    })}
                  </Typography>
                </FormControl>

                <Button
                  disabled={selection === null}
                  type="submit"
                  className={!selection ? classes.disabledButton : classes.button}
                >
                  {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.reportDataDialog.submit' })}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
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
