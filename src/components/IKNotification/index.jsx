import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@material-ui/core';
import Notification from '../Notification';
import IKDialog from './IKDialog';

const IKNotification = () => {
  const [open, setOpen] = useState(false);
  const intl = useIntl();

  return (
    <>
      <Notification>
        <Button
          color="inherit"
          style={{ fontSize: 16 }}
          onClick={() => setOpen(true)}
          disableRipple
        >
          {intl.formatMessage({ id: 'components.ikNotification.title' })}
        </Button>
      </Notification>
      <IKDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default IKNotification;
