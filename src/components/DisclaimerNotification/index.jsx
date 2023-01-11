import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import LegalDisclaimer from '../LegalDisclaimer';
import Notification from '../Notification';

const useStyles = makeStyles({
  root: {
    marginBottom: '1.5rem',
  },
  block: {
    alignItems: 'center',
    display: 'flex',
    '& > *': { display: 'inline-block' },
    '& > p': {
      flex: 1,
      fontSize: 16,
      paddingRight: '10em',
    },
  },
});

const DisclaimerNotification = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  return (
    <Notification className={classes.root}>
      <LegalDisclaimer
        title={intl.formatMessage({ id: 'components.disclaimerNotification.modal' })}
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className={classes.block}>
        <p>
          <b>{intl.formatMessage({ id: 'components.disclaimerNotification.title' })}</b>
          &nbsp;-&nbsp;
          {
            intl.formatMessage({ id: 'components.disclaimerNotification.body' }, {
              link: (
                <Button
                  color="inherit"
                  onClick={handleClick}
                  disableRipple
                >
                  {intl.formatMessage({ id: 'components.disclaimerNotification.link' })}
                </Button>
              ),
            })
          }
        </p>
        <Button variant="contained" color="primary" onClick={handleClick}>
          {intl.formatMessage({ id: 'components.disclaimerNotification.button' })}
        </Button>
      </div>
    </Notification>
  );
};

export default DisclaimerNotification;
