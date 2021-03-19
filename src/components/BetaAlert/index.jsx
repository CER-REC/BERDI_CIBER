import React from 'react';
import { useIntl } from 'react-intl';

const BetaAlert = () => {
  const intl = useIntl();

  return (
    <div className="alert alert-info">
      <span>
        <strong>{intl.formatMessage({ id: 'pages.landing.alert.title' })}</strong>
        &nbsp;-&nbsp;
        {intl.formatMessage({ id: 'pages.landing.alert.body' })}
        &nbsp;
        <a href="https://www.cer-rec.gc.ca/">{intl.formatMessage({ id: 'pages.landing.alert.link' })}</a>
      </span>
    </div>
  );
};

export default BetaAlert;
