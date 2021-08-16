import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel, FormLabel, Grid,
  IconButton, InputBase, makeStyles, Radio, RadioGroup, Typography,
} from '@material-ui/core';
// import { useIntl } from 'react-intl';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  titleSection: {},
  body: {
    '& label': {
      fontWeight: 'normal',
      padding: '0.3em 0 0 0',
      '& input': {
        marginRight: '0.3em',
      },
    },
  },
  textField: {},
  radioGroup: {
    '& .MuiRadio-root': {
      padding: '0 0 0 0.4em',
    },
  },
  disabledButton: {
    backgroundColor: '#A1A3A5',
    // The material ui disabled styles want to ignore this
    color: 'white !important',
    padding: '0.5em 4em 0.5em 4em',
  },
  button: {
    backgroundColor: '#07456B',
    color: 'white',
    padding: '0.5em 4em 0.5em 4em',
  },
});

const ReportDataDialog = ({ title, open, onClose }) => {
  // const intl = useIntl();
  const classes = useStyles();

  const [selection, setSelection] = React.useState(null);
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
        <Grid item container className={classes.titleSection} style={{ backgroundColor: '#07456B', color: 'white', padding: '0 1em 0 2em' }}>

          <Grid container direction="row">
            <Grid item xs={11} style={{ padding: '0.5em 0 0.5em 0' }}>
              <Typography style={{ paddingBottom: '0.5em' }} variant="h6">Report this data:</Typography>
              {/* TODO: this will need to have a see more button associated with it */}
              <Grid item>{title}</Grid>
            </Grid>

            <Grid item xs={1}>
              <IconButton aria-label="close" onClick={handleClose} style={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

        </Grid>
        <Grid item container className={classes.body}>
          <Grid container item justify="flex-end">
            <Grid item style={{ fontStyle: 'italic', padding: '1em 1em 0 0' }}>
              <span style={{ color: 'red' }}>* </span>
              required
            </Grid>
          </Grid>
          <Grid item container direction="column" justify="center" alignItems="center">
            <Grid item style={{ padding: '0 2em 1em 2em' }}>

              <form>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    What concern would you like to report?
                    <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <RadioGroup className={classes.radioGroup} aria-label="reason" name="reason" value={selection} onChange={handleChange}>
                    <FormControlLabel value="strange characters" control={<Radio />} label="The data had strange characters." />
                    <FormControlLabel value="data not in document" control={<Radio />} label="I couldn't find the data in the original document." />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <InputBase className={classes.textField} disabled={selection !== 'other'} name="otherText" id="otherText" style={{ width: '90%', marginLeft: '1.2em', border: '1px solid #CCCCCC', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.08)', borderRadius: '2px', paddingBottom: '' }} />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <p style={{ paddingTop: '2em', paddingLeft: 0 }}>
                    Please explain in more detail
                    <sup style={{ top: 0 }}> (optional)</sup>
                  </p>
                  <br />
                  <InputBase multiline rowsMin={4} style={{ width: '100%', border: '1px solid #CCCCCC', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.08)', borderRadius: '2px' }} type="text" name="explanation" id="explanation" rows="3" cols="20" />
                  <Typography variant="body2" style={{ paddingBottom: '2em', paddingTop: '1em', fontSize: '12px' }}>Your feedback is voluntary and your personal information is not required. Any personal information that you choose to provide is protected under the provisions of the Privacy Act. The Act provides you with a right of access to your information. To request access, please contact atip.office@cer-rec.gc.ca. To learn more about how we collect and store this information, please review our Terms and Conditions. </Typography>
                </FormControl>
                <Button
                  disabled={selection === null}
                  type="submit"
                  className={!selection ? classes.disabledButton : classes.button}
                >
                  Submit
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
