import React from 'react';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';
import Alert from '../Alert';

const AccuracyAlert = () => {
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => {
    reportSection('methods');
    configDispatch({ type: 'page/changed', payload: 'methods' });
  };

  return (
    <Alert
      className="AccuracyAlert alert-warning"
      title={intl.formatMessage({ id: 'components.accuracyAlert.title' })}
      body={intl.formatMessage({ id: 'components.accuracyAlert.body' })}
      link={intl.formatMessage({ id: 'common.learnMethods' })}
      onClick={handleClick}
    />
  );
};

export default AccuracyAlert;
