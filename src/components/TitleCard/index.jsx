import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Typography, Button, makeStyles } from '@material-ui/core';
import ToolLogo from '../ToolLogo';
import { lang, DATA_UPDATE_DATE } from '../../constants';
import { reportSection } from '../../utilities/analytics';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    '& hr': {
      borderColor: theme.palette.primary.main,
    },
    '& p:first-of-type': {
      fontWeight: 700,
    },
    textAlign: 'center',
  },
  header: {
    color: theme.palette.common.white,
  },
  link: { fontWeight: 'bold' },
}));

export default () => {
  const intl = useIntl();
  const classes = useStyles();
  const { configDispatch } = useConfig();
  const handleLinkClick = useCallback(() => {
    reportSection('project');
    configDispatch({ type: 'page/changed', payload: 'project' });
  }, [configDispatch]);
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <ToolLogo style={{ width: '18em', marginLeft: '1.5em' }} />
        <Typography>{intl.formatMessage({ id: 'pages.landing.taglineBold' })}</Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'pages.landing.tagline' },
              {
                updateDate: DATA_UPDATE_DATE.toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' }),
                learnMoreLink: (
                  <Button
                    className={classes.link}
                    color="inherit"
                    onClick={handleLinkClick}
                    disableRipple
                  >
                    {intl.formatMessage({ id: 'pages.landing.learnMoreText' })}
                  </Button>
                ),
              },
            )
          }
        </Typography>
      </header>
    </div>
  );
};
