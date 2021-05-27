import React from 'react';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

const Accreditations = () => {
  const intl = useIntl();

  return (
    <>
      <Typography
        style={{ fontSize: 12, fontStyle: 'italic' }}
        variant="h6"
      >
        {intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.title' })}
      </Typography>
      <Typography style={{ fontSize: 12, fontStyle: 'italic' }}>
        {intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.body' })}
      </Typography>
    </>
  );
};

export default Accreditations;
