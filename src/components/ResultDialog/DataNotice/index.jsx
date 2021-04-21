import React from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import { reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
    backgroundColor: '#F9F4D4',
    padding: '0.5em 1.5em',
    '& p, button': {
      fontStyle: 'italic',
    },
  },
});

const DataNotice = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => {
    reportSection('methods');
    configDispatch({ type: 'page/changed', payload: 'methods' });
  };

  return (
    <Grid className={`DataNotice ${classes.root}`} item>
      <Typography>
        {intl.formatMessage({ id: 'components.resultDialog.dataNotice' })}
      </Typography>
      <Button
        color="inherit"
        onClick={handleClick}
        disableRipple
      >
        {intl.formatMessage({ id: 'common.learnMethods' })}
      </Button>
    </Grid>
  );
};

export default DataNotice;
