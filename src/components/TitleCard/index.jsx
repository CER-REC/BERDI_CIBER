import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, makeStyles } from '@material-ui/core';
import berdiLogo from '../../images/landing/logo-berdi.svg';
import ciberLogo from '../../images/landing/logo-ciber.svg';
import { lang } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& hr': {
      borderColor: theme.palette.primary.main,
    },
    '& img': {
      marginLeft: '1.5em',
      width: '18em',
    },
    '& p:first-of-type': {
      fontWeight: 700,
    },
    textAlign: 'center',
  },
  header: {
    color: theme.palette.common.white,
  },
}));

export default () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img src={lang === 'fr' ? ciberLogo : berdiLogo} alt="Tool Logo" />
        <Typography>{intl.formatMessage({ id: 'pages.landing.taglineBold' })}</Typography>
        <Typography>{intl.formatMessage({ id: 'pages.landing.tagline' })}</Typography>
      </header>
    </div>
  );
};
