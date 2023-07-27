import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import LimitationsDialog from '../../LimitationsDialog';
import useConfig from '../../../hooks/useConfig';
import { reportDisclaimer, reportPageView, reportSectionLinks } from '../../../utilities/analytics';
import education from '../../../images/landing/education.png';

const useStyles = makeStyles({
  root: {
    padding: '2.5em 5em',
  },
  inlineButton: {
    display: 'inline',
  },
});

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
    const fragment = 'ikInformation';
    const page = 'methods';
    reportSectionLinks();
    reportPageView(fragment);
    configDispatch({ type: 'page/fragment/changed', payload: { page, fragment } });
  }, [configDispatch]);

  const handleClick = useCallback((page) => {
    reportSectionLinks();
    configDispatch({ type: 'page/changed', payload: page });
    reportPageView(page);
  }, [configDispatch]);
  const createHandleClick = useCallback((page) => () => handleClick(page), [handleClick]);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={3}>
        <img src={education} alt="" style={{ width: '70%' }} />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h5">
          <b>{intl.formatMessage({ id: 'pages.landing.title' })}</b>
        </Typography>
        <Typography style={{ padding: '0.5em 0', lineHeight: 1.65 }}>
          {
            intl.formatMessage(
              { id: 'pages.landing.body' },
              {
                projectLink: (
                  <Button
                    color="secondary"
                    component="span"
                    onClick={createHandleClick('project')}
                    disableRipple
                    className={classes.inlineButton}
                  >
                    {intl.formatMessage({ id: 'pages.landing.projectLinkText' })}
                  </Button>
                ),
                dataLink: (
                  <Button
                    color="secondary"
                    component="span"
                    onClick={createHandleClick('data')}
                    disableRipple
                    className={classes.inlineButton}
                  >
                    {intl.formatMessage({ id: 'pages.landing.dataLinkText' })}
                  </Button>
                ),
                methodLink: (
                  <Button
                    color="secondary"
                    component="span"
                    onClick={createHandleClick('methods')}
                    disableRipple
                    className={classes.inlineButton}
                  >
                    {intl.formatMessage({ id: 'pages.landing.methodLinkText' })}
                  </Button>
                ),
                ikLink: (
                  <Button
                    color="secondary"
                    component="span"
                    onClick={handleScrollClick}
                    disableRipple
                    className={classes.inlineButton}
                  >
                    {intl.formatMessage({ id: 'pages.landing.ikLinkText' })}
                  </Button>
                ),
                generalLimitations: (
                  <Button
                    color="secondary"
                    component="span"
                    onClick={handleButtonClick}
                    disableRipple
                    className={classes.inlineButton}
                  >
                    {intl.formatMessage({ id: 'pages.landing.generalLimitationsText' })}
                  </Button>
                ),
              },
            )
          }
        </Typography>
        <Button variant="contained" color="primary" onClick={createHandleClick('project')}>
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
