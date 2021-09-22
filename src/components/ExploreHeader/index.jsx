import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-between',
    color: theme.palette.grey.dark,
    margin: '0.5em 0',
    '& p': {
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  line: {
    backgroundColor: theme.palette.grey.dark,
    height: '1px',
  },
}));

export default () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Grid container className={classes.root} alignItems="center" wrap="nowrap">
      <Grid item xs={4}>
        <hr className={classes.line} />
      </Grid>
      <Typography>{intl.formatMessage({ id: 'pages.landing.exploreTopics' })}</Typography>
      <Grid item xs={4}>
        <hr className={classes.line} />
      </Grid>
    </Grid>
  );
};
