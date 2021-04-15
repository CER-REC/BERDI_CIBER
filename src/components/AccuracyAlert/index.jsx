import React, { useCallback } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';

const useStyles = makeStyles(() => ({
  root: {
    '& ::before': {
      transform: 'translate(-0.5em)',
    },
  },
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

// TODO: Refactor this component along with BetaAlert
const AccuracyAlert = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = useCallback(() => {
    reportSection('methods');
    configDispatch({ type: 'page/changed', payload: 'methods' });
  }, [configDispatch]);

  return (
    <div className={`AccuracyAlert alert alert-warning ${classes.root}`}>
      <span style={{ marginLeft: '1.5em' }}>
        <strong>{intl.formatMessage({ id: 'components.accuracyAlert.title' })}</strong>
        &nbsp;-&nbsp;
        {intl.formatMessage({ id: 'components.accuracyAlert.body' })}
        &nbsp;
        <Button
          classes={{ text: classes.link }}
          variant="text"
          onClick={handleClick}
        >
          {intl.formatMessage({ id: 'components.accuracyAlert.link' })}
        </Button>
      </span>
    </div>
  );
};

export default AccuracyAlert;
