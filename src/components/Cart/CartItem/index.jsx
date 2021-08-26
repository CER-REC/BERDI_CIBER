import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, IconButton, Typography, ButtonBase, ListItem,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '1em',
  },
  header: {
    alignItems: 'flex-start',
  },
}));

const CartItem = ({ data, style }) => {
  const classes = useStyles();
  const { configDispatch } = useConfig();

  const [removeButtonHover, setRemoveButtonHover] = useState(false);
  const handleRemoveButtonHover = () => setRemoveButtonHover(true);
  const handleRemoveButtonHoverEnd = () => setRemoveButtonHover(false);

  const handleRemoveItem = () => {
    configDispatch({ type: 'cartIds/removed', payload: data.id });
  };

  return (
    <ListItem style={style}>
      <Grid className={classes.root}>
        <Grid container wrap="nowrap" className={classes.header}>
          <Grid item>
            <Typography>
              {data.title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleRemoveItem}
              onMouseEnter={handleRemoveButtonHover}
              onMouseLeave={handleRemoveButtonHoverEnd}
            >
              {
                (removeButtonHover && <RemoveCircleIcon />) || (<RemoveCircleOutlineIcon />)
              }
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <ButtonBase>
            View more details
          </ButtonBase>
        </Grid>
      </Grid>
    </ListItem>
  );
};

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    application: PropTypes.shape({
      name: PropTypes.string,
      companyName: PropTypes.string,
    }),
  }).isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default CartItem;
