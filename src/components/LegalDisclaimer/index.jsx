import { Button, Dialog, FormControl, FormControlLabel, Grid, makeStyles, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import cerLogo from '../../images/cerLogo.svg';

const useStyles = makeStyles({
  root: {
    '& .MuiButton-contained.Mui-disabled': {
      color: 'white',
      backgroundColor: '#D4D9E0',
    },
    '& .MuiButton-containedPrimary:hover': {
      backgroundColor: '#26374A',
    },
  },
  paper: {
    maxWidth: '610px',
    padding: '2em',
  },
});

const LegalDisclaimer = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleClose = (event, reason) => { if (reason !== 'backdropClick') { setOpen(false); } };
  const toggleChecked = () => setChecked(!checked);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ className: classes.paper }}
      disableEscapeKeyDown
      className={classes.root}
    >
      <img alt="Canadian flag and text reading Canadas energy regulator" src={cerLogo} style={{ maxWidth: '23em' }} />
      <Grid container justify="center" style={{ color: '#616060' }}>
        <Typography variant="h6" style={{ padding: '1.5em 0', color: 'black' }}>
          {intl.formatMessage({ id: 'components.legalDisclaimer.attention' })}
        </Typography>
        <Typography style={{ paddingBottom: '1em' }}>
          {intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer1' })}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: 'components.legalDisclaimer.disclaimer2' })}
        </Typography>

        <Grid container justify="flex-end" alignItems="center">
          <FormControl>
            <FormControlLabel
              value="agreed"
              control={<Checkbox />}
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
            {intl.formatMessage({ id: 'components.legalDisclaimer.enter' }, {
              tool: intl.formatMessage({ id: 'common.toolName' }).toUpperCase(),
            })}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default LegalDisclaimer;
