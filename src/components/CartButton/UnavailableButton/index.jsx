import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import Alert from '../../../images/cartButton/alert.svg';
import styles from '../styles';

const useStyles = makeStyles(styles);

const RemoveButton = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Button className={`CartButton ${classes.root} ${classes.unavailable}`} disabled>
      <img alt="Alert" src={Alert} />
      {intl.formatMessage({ id: 'components.cartButton.unavailable' })}
    </Button>
  );
};

export default RemoveButton;
