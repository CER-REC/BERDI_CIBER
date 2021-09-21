import React, { useCallback, useState } from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import LimitationsDialog from '../../../components/LimitationsDialog';
import useConfig from '../../../hooks/useConfig';
import { reportDisclaimer, reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '10px',
    backgroundColor: theme.palette.teal.light,
    padding: '1.5em',
    margin: '1em 0',
  },
  button: {
    backgroundColor: theme.palette.teal.light,
    borderColor: theme.palette.teal.dark,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'black',
  },
  link: {
    textDecoration: 'underline',
    display: 'inline',
    fontWeight: 'bold',
    cursor: 'pointer',
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
        <Typography variant="body1">
          {intl.formatMessage(
            { id: 'pages.landing.disclaimer.body' },
            {
              learnMoreLink: (
                <Typography variant="body1" className={classes.link} onClick={handleLinkClick}>
                  {intl.formatMessage({ id: 'pages.landing.disclaimer.link' })}
                </Typography>
              ),
            },
          )}
        </Typography>
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
