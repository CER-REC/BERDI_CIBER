import React, { useCallback } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.green.light,
    padding: '1.5em',
    margin: '1em 0',
    '& p': {
      fontSize: 20,
      margin: 0,
    },
  },
  button: {
    backgroundColor: theme.palette.green.light,
    borderColor: theme.palette.green.dark,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: theme.palette.green.dark,
    '&:hover': { color: theme.palette.green.light },
  },
  sideBlock: {
    margin: 'auto',
    textAlign: 'right',
  },
}));

const Disclaimer = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleLinkClick = useCallback(
    () => configDispatch({ type: 'page/changed', payload: 'page2' }),
    [configDispatch],
  );

  return (
    <Grid container className={`Disclaimer ${classes.root}`}>
      <Grid item xs={9}>
        <p>
          {intl.formatMessage({ id: 'pages.landing.disclaimer.body' })}
        </p>
        <Button
          variant="text"
          onClick={handleLinkClick}
          disableRipple
        >
          {intl.formatMessage({ id: 'pages.landing.disclaimer.link' })}
        </Button>
      </Grid>
      <Grid item xs={3} classes={{ root: classes.sideBlock }}>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          disableElevation
        >
          {intl.formatMessage({ id: 'pages.landing.disclaimer.button' })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Disclaimer;
