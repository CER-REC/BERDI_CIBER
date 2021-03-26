import React, { useCallback } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';

const useStyles = makeStyles(() => ({
  link: {
    fontSize: 16,
    padding: 0,
    lineHeight: 'normal',
    textDecoration: 'underline',
    textTransform: 'none',
    verticalAlign: 'text-bottom',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}));

const BetaAlert = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = useCallback(() => {
    reportSection('project');
    configDispatch({ type: 'page/changed', payload: 'project' });
  }, [configDispatch]);

  return (
    <div className="BetaAlert alert alert-info">
      <span>
        <strong>{intl.formatMessage({ id: 'pages.landing.alert.title' })}</strong>
        &nbsp;-&nbsp;
        {intl.formatMessage({ id: 'pages.landing.alert.body' })}
        &nbsp;
        <Button
          classes={{ text: classes.link }}
          variant="text"
          onClick={handleClick}
        >
          {intl.formatMessage({ id: 'pages.landing.alert.link' })}
        </Button>
      </span>
    </div>
  );
};

export default BetaAlert;
