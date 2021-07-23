import React from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import { reportSection } from '../../../utilities/analytics';
import styles from '../styles';

const useStyles = makeStyles(styles);

const DataNotice = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => {
    reportSection('methods');
    configDispatch({ type: 'page/changed', payload: 'methods' });
    window.scrollTo(0, 0);
  };

  return (
    <Grid className={`DataNotice ${classes.tooltip}`} item>
      <Typography>
        {intl.formatMessage({ id: 'components.cartButton.dataNotice' })}
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
