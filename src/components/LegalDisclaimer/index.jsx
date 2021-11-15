import {
  Button, Checkbox, Dialog, FormControl, FormControlLabel, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { lang } from '../../constants';
import cerLogoEn from '../../images/cerLogoEn.png';
import cerLogoFr from '../../images/cerLogoFr.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-contained.Mui-disabled': {
      color: 'white',
      backgroundColor: '#D4D9E0',
    },
    '& .MuiButton-containedPrimary:hover': {
      backgroundColor: theme.palette.blue.dark,
    },
    '& .MuiGrid-container': {
      color: theme.palette.grey.dark,
    },
  },
  paper: {
    maxWidth: '610px',
    padding: '2em',
  },
  checked: {
    '&$checked': {
      color: theme.palette.blue.dark,
    },
  },
  unChecked: {
    color: 'grey',
  },
}));

const LegalDisclaimer = ({ onClose, open, setOpen }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [checked, setChecked] = useState(false);
  const logo = lang === 'fr' ? cerLogoFr : cerLogoEn;

  const handleClose = (_, reason) => { if (reason !== 'backdropClick') { onClose(); setOpen(false); setChecked(false); } };
  const toggleChecked = () => setChecked(!checked);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ className: classes.paper }}
      disableEscapeKeyDown
      className={classes.root}
    >
      <img alt="Canadian flag and text reading Canadas energy regulator" src={logo} style={{ maxWidth: '23em' }} />
      <Grid container justify="center">
        <div>
          <Typography variant="h6" style={{ padding: '1.5em 0', color: 'black' }}>
            {intl.formatMessage({ id: 'components.legalDisclaimer.attention' })}
          </Typography>
          <Typography style={{ paddingBottom: '1em' }}>
            {intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer1' })}
          </Typography>
          <Typography style={{ paddingBottom: '1em' }}>
            {intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer2' })}
          </Typography>
        </div>

        <div>
          <ul>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet1' })}</li>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet2' })}</li>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet3' })}</li>
            <li>{intl.formatMessage({ id: 'components.legalDisclaimer.bullet4' })}</li>
            <li>
              {intl.formatMessage({ id: 'components.legalDisclaimer.bullet5' }, {
                not: (<span style={{ fontWeight: '900' }}>{intl.formatMessage({ id: 'components.legalDisclaimer.not' })}</span>),
              })}
            </li>
          </ul>
        </div>
        <Grid container justify="flex-end" alignItems="center" style={{ paddingTop: '1em' }}>
          <FormControl>
            <FormControlLabel
              value="agreed"
              control={<Checkbox className={checked ? classes.checked : classes.unChecked} />}
              label={intl.formatMessage({ id: 'components.legalDisclaimer.agree' })}
              labelPlacement="end"
              onChange={toggleChecked}
            />
          </FormControl>
          <Button
            disabled={!checked}
            variant="contained"
            color="primary"
            disableFocusRipple
            style={{ padding: '0.2em 1.5em' }}
            onClick={handleClose}
          >
            {intl.formatMessage({ id: 'components.legalDisclaimer.enter' })}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default LegalDisclaimer;

LegalDisclaimer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
