import React from 'react';
import { Button, Tooltip, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import alert from '../../../images/cartButton/alert.svg';
import DataNotice from '../DataNotice';
import styles from '../styles';

const useStyles = makeStyles(styles);

const RemoveButton = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    // Need to wrap the button in another element
    // because a disabled button doesn't fire the events to trigger the tooltip
    <Tooltip title={<DataNotice />} interactive>
      <div style={{ width: '100%' }}>
        <Button className={`CartButton ${classes.root} ${classes.unavailable}`} disabled>
          <img alt="Alert" src={alert} />
          {intl.formatMessage({ id: 'components.cartButton.unavailable' })}
        </Button>
      </div>
    </Tooltip>
  );
};

export default RemoveButton;
