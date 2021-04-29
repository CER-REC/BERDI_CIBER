import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, makeStyles } from '@material-ui/core';
import BerdiLogo from '../../images/landing/logo-berdi.svg';
import CiberLogo from '../../images/landing/logo-ciber.svg';
import { lang } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& hr': {
      borderColor: theme.palette.primary.main,
    },
    '& img': {
      marginBottom: '1em',
    },
    '& p:first-of-type': {
      fontWeight: 700,
    },
    textAlign: 'center',
  },
}));

export default () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <img src={lang === 'fr' ? CiberLogo : BerdiLogo} alt="Tool Logo" />
        <Typography>{intl.formatMessage({ id: 'pages.landing.taglineBold' })}</Typography>
        <Typography>{intl.formatMessage({ id: 'pages.landing.tagline' })}</Typography>
      </header>
      <hr />
    </div>
  );
};
