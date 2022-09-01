import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import LimitationsDialog from '../../LimitationsDialog';
import useConfig from '../../../hooks/useConfig';
import { reportDisclaimer, reportSection } from '../../../utilities/analytics';
import education from '../../../images/landing/education.png';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2.5em 0',
  },
  button: {
    backgroundColor: theme.palette.teal.blue,
    color: 'white',
  },
}));

const NavBlock = () => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  const handleButtonClick = useCallback(() => {
    reportDisclaimer();
    setOpen(true);
  }, [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleScrollClick = useCallback(() => {
    const page = 'methods';
    reportSection(page);
    configDispatch({ type: 'page/fragment/changed', payload: { page, fragment: 'ikInformation' } });
  }, [configDispatch]);

  const handleClick = useCallback((page) => {
    reportSection(page);
    configDispatch({ type: 'page/changed', payload: page });
  }, [configDispatch]);
  const createHandleClick = useCallback((page) => (() => handleClick(page)), [handleClick]);

  return (
    <Grid container spacing={3} className={`TitleContent ${classes.root} `}>
      <Grid item xs={3}>
        <img src={education} alt="education" />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h5">
          <b>{intl.formatMessage({ id: 'pages.landing.title' })}</b>
        </Typography>
        <Typography variant="body1" style={{ padding: '0.5em 0' }}>
          {
            intl.formatMessage(
              { id: 'pages.landing.body' },
              {
                projectLink: (
                  <Button color="inherit" onClick={createHandleClick('project')} disableRipple>
                    {intl.formatMessage({ id: 'pages.landing.projectLinkText' })}
                  </Button>
                ),
                dataLink: (
                  <Button color="inherit" onClick={createHandleClick('data')} disableRipple>
                    {intl.formatMessage({ id: 'pages.landing.dataLinkText' })}
                  </Button>
                ),
                methodLink: (
                  <Button color="inherit" onClick={createHandleClick('methods')} disableRipple>
                    {intl.formatMessage({ id: 'pages.landing.methodLinkText' })}
                  </Button>
                ),
                ikLink: (
                  <Button color="inherit" onClick={handleScrollClick} disableRipple>
                    {intl.formatMessage({ id: 'pages.landing.ikLinkText' })}
                  </Button>
                ),
                generalLimitations: (
                  <Button color="inherit" onClick={handleButtonClick} disableRipple>
                    {intl.formatMessage({ id: 'pages.landing.generalLimitationsText' })}
                  </Button>
                ),
              },
            )
          }
        </Typography>
        <Button variant="contained" color="primary" classes={{ root: classes.button }} onClick={createHandleClick('project')}>
          {intl.formatMessage({ id: 'pages.landing.learnMoreButton' })}
        </Button>
      </Grid>
      <LimitationsDialog
        open={open}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default NavBlock;
