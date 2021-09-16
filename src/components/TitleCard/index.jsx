import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, makeStyles } from '@material-ui/core';
import ToolLogo from '../ToolLogo';

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
}));

export default () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <ToolLogo style={{ width: '18em', marginLeft: '1.5em' }} />
        <Typography>{intl.formatMessage({ id: 'pages.landing.taglineBold' })}</Typography>
        <Typography>{intl.formatMessage({ id: 'pages.landing.tagline' })}</Typography>
      </header>
    </div>
  );
};
