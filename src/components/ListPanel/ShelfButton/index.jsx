import React from 'react';
import { Grid, makeStyles, ButtonBase } from '@material-ui/core';
import PlusIcon from '../../../images/listPanel/shelfButton/plusIcon.svg';

const useStyles = makeStyles(() => (
  {
    root: {
      backgroundColor: '#D2EDEB',
      borderRadius: '5px',
      width: '100%',
      padding: '0.7em 1em ',
    },
  }
));

const ShelfButton = () => {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.root}>
      <Grid container item direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <img alt="A plus icon" src={PlusIcon} />
        </Grid>

        <Grid item>
          Add to shelf
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

export default ShelfButton;
