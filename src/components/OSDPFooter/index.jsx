import React from 'react';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#D0EDF8',
    border: '1px solid transparent',
    borderRadius: '10px',
    padding: '1.5em 1.5em 1.5em 3em',
    marginBottom: '1em',
  },
  button: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.teal.blue,
    boxShadow: 'none',
    maxHeight: '6em',
    padding: '0.4em 1em',
    alignItems: 'center',
  },
  buttonLabel: {
    position: 'relative',
    top: '1px',
  },
  buttonIcon: {
    marginLeft: '0.75em',
  },
}));

const OSDPFooter = () => {
  const classes = useStyles();
  const intl = useIntl();

  const handleClick = () => window.open(`${intl.formatMessage({ id: 'common.osdpURL' })}`, '_blank', 'noopener noreferrer');

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={7} direction="column">
        <Typography style={{ fontSize: '24px' }}>
          {intl.formatMessage({ id: 'components.osdpFooter.header' })}
        </Typography>
        <Typography style={{ paddingTop: '0.5em' }}>
          {intl.formatMessage({ id: 'components.osdpFooter.body' })}
        </Typography>
      </Grid>
      <Grid container item xs={5} justify="flex-end" alignContent="center">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleClick}
        >
          <Typography className={classes.buttonLabel}>
            {intl.formatMessage({ id: 'components.osdpFooter.button' })}
          </Typography>
          <OpenInNewIcon className={classes.buttonIcon} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default OSDPFooter;
