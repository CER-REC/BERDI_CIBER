import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';

const BetaAlert = () => {
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = useCallback(() => {
    reportSection('project');
    configDispatch({
      type: 'page/fragment/changed',
      payload: { page: 'project', fragment: 'learn' },
    });
  }, [configDispatch]);

  return (
    <div className="BetaAlert alert alert-info">
      <span>
        &nbsp;
        <strong>{intl.formatMessage({ id: 'pages.landing.alert.title' })}</strong>
        &nbsp;-&nbsp;
        {intl.formatMessage({ id: 'pages.landing.alert.body' })}
        &nbsp;
        <Button
          color="inherit"
          onClick={handleClick}
          disableRipple
        >
          {intl.formatMessage({ id: 'pages.landing.alert.link' })}
        </Button>
      </span>
    </div>
  );
};

export default BetaAlert;
