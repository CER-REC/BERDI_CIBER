import React, { useCallback, useState } from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import LimitationsDialog from '../../../components/LimitationsDialog';
import useConfig from '../../../hooks/useConfig';
import { reportDisclaimer, reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.teal.light,
    padding: '1.5em',
    margin: '1em 0',
    '& p': {
      fontSize: 20,
      margin: 0,
    },
  },
  button: {
    backgroundColor: theme.palette.teal.light,
    borderColor: theme.palette.teal.dark,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'black',
  },
  link: {
    fontSize: 20,
    fontWeight: 700,
  },
  sideBlock: {
    margin: 'auto',
    textAlign: 'right',
  },
}));

const Disclaimer = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleLinkClick = useCallback(() => {
    reportSection('data');
    configDispatch({ type: 'page/changed', payload: 'data' });
  }, [configDispatch]);
  const handleButtonClick = useCallback(() => {
    reportDisclaimer();
    setOpen(true);
  }, [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Grid container className={`Disclaimer ${classes.root}`}>
      <Grid item xs={9}>
        <Typography component="p">
          {intl.formatMessage({ id: 'pages.landing.disclaimer.body' })}
        </Typography>
        <Button
          classes={{ text: classes.link }}
          color="inherit"
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
          onClick={handleButtonClick}
          disableElevation
        >
          {intl.formatMessage({ id: 'pages.landing.disclaimer.button' })}
        </Button>
        <LimitationsDialog
          open={open}
          hasDownload={false}
          onClose={handleClose}
        />
      </Grid>
    </Grid>
  );
};

export default Disclaimer;
