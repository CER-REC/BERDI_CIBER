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
  '@global': {
    '@keyframes fade': {
      to: { boxShadow: '0 0 0 1px #C4C4C4' },
    },
  },
  root: {
    boxShadow: '0 0 0 1px #C4C4C4',
    borderRadius: '5px',
    padding: '1em',
    width: '100%',
  },
  rootNew: {
    animation: 'fade 0.3s ease-out 3s forwards',
    boxShadow: '0 0 0 3px #FF9900',
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
  infoTable: {
    color: theme.palette.grey.dark,
  },
  infoLabel: {
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    paddingRight: '1em',
    '& p': {
      fontWeight: 'bold',
    },
  },
  footer: {
    alignContent: 'flex-start',
  },
}));

const CartItem = ({ data, style, isUnread, expandList, toggleExpand }) => {
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
      <Grid
        className={(isUnread) ? classes.rootNew : classes.root}
        onAnimationEnd={() => configDispatch({ type: 'unreadCartIds/removed' })}
      >
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
              <table className={classes.infoTable}>
                <tbody>
                  <tr>
                    <td className={classes.infoLabel}>
                      <Typography>
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
                    <td className={classes.infoLabel}>
                      <Typography>
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
          <Grid item style={{ justifyContent: 'flex-start', fontSize: '13px' }}>
            <ViewMoreDetailsButton
              expandList={expandList}
              content={data}
              toggleExpand={toggleExpand}
            />
          </Grid>
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
  isUnread: PropTypes.bool.isRequired,
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default CartItem;
