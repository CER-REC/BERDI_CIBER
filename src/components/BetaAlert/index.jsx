import React from 'react';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';
import Alert from '../Alert';

const BetaAlert = () => {
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => {
    reportSection('project');
    configDispatch({
      type: 'page/fragment/changed',
      payload: { page: 'project', fragment: 'learn' },
    });
  };

  return (
    <Alert
      className="BetaAlert alert-info"
      title={intl.formatMessage({ id: 'components.betaAlert.title' })}
      body={intl.formatMessage({ id: 'components.betaAlert.body' })}
      link={intl.formatMessage({ id: 'components.betaAlert.link' })}
      onClick={handleClick}
    />
  );
};

export default BetaAlert;
