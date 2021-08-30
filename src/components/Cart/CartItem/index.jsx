import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, IconButton, Typography, ListItem,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import useConfig from '../../../hooks/useConfig';
import PlaceHolderImage from '../../../images/listPanel/placeHolder.svg';
import MagnifyingGlass from '../../../images/listPanel/magnifyingGlass.svg';
import ViewMoreDetailsButton from '../../ListPanel/SearchList/ViewMoreDetailsButton'; // TODO: move this out of ListPanel into its own component

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '1em',
    width: '100%',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: theme.palette.grey.darker,
    '& p': {
      fontSize: '18px',
    },
  },
  imageSection: {
    cursor: 'pointer',
    backgroundImage: `url(${PlaceHolderImage})`,
    backgroundSize: 'cover',
    height: '100%',
    width: '50%',
    margin: '1em 0',
  },
  footer: {
    alignContent: 'flex-start',
  },
}));

const CartItem = ({ data, style, expandList, toggleExpand }) => {
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
        <Grid container item direction="column" className={classes.footer}>
          {expandList.includes(data.id) && (
            <Grid container direction="column">
              <Grid
                item
                container
                alignItems="flex-end"
                justify="flex-end"
                className={classes.imageSection}
              >
                <Grid item>
                  <img alt="A magnifying glass" src={MagnifyingGlass} />
                </Grid>
              </Grid>
              <table>
                <tbody>
                  <tr>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Typography style={{ fontWeight: 'bold' }}>
                        Project name:
                      </Typography>
                    </td>
                    <td>
                      <Typography>
                        {data.application.name}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Typography style={{ fontWeight: 'bold' }}>
                        Company:
                      </Typography>
                    </td>
                    <td>
                      <Typography>
                        {data.application.companyName}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          )}
          <ViewMoreDetailsButton
            expandList={expandList}
            content={data}
            toggleExpand={toggleExpand}
          />
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
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default CartItem;
