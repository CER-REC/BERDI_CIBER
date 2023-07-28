import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import { reportPageView, reportSection } from '../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: '700',
    fontSize: '16px',
    color: theme.palette.button.blue,
    '&:hover': { backgroundColor: theme.palette.grey.light },
  },
}));

const BackButton = () => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const handleClick = useCallback(() => {
    reportSection('landing');
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'search/removed' });
    configDispatch({ type: 'page/changed', payload: 'landing' });
    reportPageView('landing');
  }, [configDispatch]);
  const createHandleClick = useCallback(() => (() => handleClick()), [handleClick]);

  return (
    <Button onClick={createHandleClick()} className={classes.button}>
      <ArrowBackIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: '0.5em' }} />
      {intl.formatMessage({ id: 'pages.back' })}
    </Button>
  );
};

export default BackButton;
