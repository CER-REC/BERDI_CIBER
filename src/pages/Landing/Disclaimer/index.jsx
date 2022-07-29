import React, { useCallback, useState } from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import LimitationsDialog from '../../../components/LimitationsDialog';
import useConfig from '../../../hooks/useConfig';
import { reportDisclaimer, reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '10px',
    backgroundColor: theme.palette.blue.light,
    padding: '1.5em',
    margin: '1em 0',
  },
  button: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderRadius: '10px',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.content.background,
    },
  },
  link: { fontWeight: 'bold' },
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
        <Typography variant="body1">
          {intl.formatMessage(
            { id: 'pages.landing.disclaimer.body' },
            {
              learnMoreLink: (
                <Button
                  className={classes.link}
                  color="inherit"
                  onClick={handleLinkClick}
                  disableRipple
                >
                  {intl.formatMessage({ id: 'pages.landing.disclaimer.link' })}
                </Button>
              ),
            },
          )}
        </Typography>
      </Grid>
      <Grid item xs={3} classes={{ root: classes.sideBlock }}>
        <Button
          classes={{ root: classes.button }}
          variant="outlined"
          onClick={handleButtonClick}
        >
          {intl.formatMessage({ id: 'pages.landing.disclaimer.button' })}
        </Button>
        <LimitationsDialog
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </Grid>
  );
};

export default Disclaimer;
