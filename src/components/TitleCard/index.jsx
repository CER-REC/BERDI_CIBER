import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& hr': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <Typography variant="h4" gutterBottom>{intl.formatMessage({ id: 'common.toolName' })}</Typography>
        <Typography style={{ fontSize: 20 }} variant="h5">{intl.formatMessage({ id: 'common.description' })}</Typography>
      </header>
      <hr />
    </div>
  );
};
