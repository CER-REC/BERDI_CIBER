import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

import PlusIcon from '../../images/cartButton/plusIcon.svg';

const useStyles = makeStyles(() => (
  {
    root: {
      backgroundColor: '#D2EDEB',
      width: '100%',
      padding: '0.7em 1em',
      justifyContent: 'space-between',
      '&:hover': { backgroundColor: '#D2EDEB' },
    },
  }
));

const CartButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.root}>
      <img alt="A plus icon" src={PlusIcon} />
      Add to shelf
    </Button>
  );
};

export default CartButton;
