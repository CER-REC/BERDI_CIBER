import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, IconButton, Typography, ListItem,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import magnifyingGlass from '../../../images/listPanel/magnifyingGlass.svg';
import ViewMoreDetailsButton from '../../ViewMoreDetailsButton';

const useStyles = makeStyles((theme) => ({
  '@keyframes fade': {
    to: { boxShadow: '0 0 0 1px #C4C4C4' },
  },
  root: {
    boxShadow: '0 0 0 1px #C4C4C4',
    borderRadius: '5px',
    padding: '1em',
    width: '100%',
  },
  rootNew: {
    animation: '$fade 0.3s ease-out 3s forwards',
    boxShadow: '0 0 0 3px #FF9900',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: theme.palette.grey.alt,
  },
  titleTruncated: {
    fontSize: '18px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  title: {
    fontSize: '18px',
  },
  removeButtonIcon: {
    fontSize: '45px',
    color: theme.palette.cart.dark,
  },
  imageSection: {
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '6em',
    width: '50%',
    margin: '1.5em 0',
    '& img': {
      margin: '0.5em 1em',
    },
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

const CartItem = ({ data, index, onHeightChange, expandList, toggleExpand }) => {
  const classes = useStyles();
  const intl = useIntl();
  const rowRef = useRef({});
  const { config: { unreadCartIds }, configDispatch } = useConfig();

  const [removeButtonHover, setRemoveButtonHover] = useState(false);
  const handleRemoveButtonHover = () => setRemoveButtonHover(true);
  const handleRemoveButtonHoverEnd = () => setRemoveButtonHover(false);
  const handleRemoveItem = () => configDispatch({ type: 'cartIds/removed', payload: data.id });

  useEffect(() => {
    onHeightChange(index, rowRef.current.clientHeight);
  }, [rowRef.current.clientHeight, index, onHeightChange]);

  return (
    <ListItem ref={rowRef}>
      <Grid
        className={`${classes.root} ${(unreadCartIds.includes(data.id)) ? classes.rootNew : ''}`}
        onAnimationEnd={() => configDispatch({ type: 'unreadCartIds/removed' })}
      >
        <Grid container wrap="nowrap" className={classes.header}>
          <Grid item xs={10}>
            <Typography
              className={(expandList.includes(data.id) ? classes.title : classes.titleTruncated)}
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ margin: '-0.5em' }}>
            <IconButton
              onClick={handleRemoveItem}
              onMouseEnter={handleRemoveButtonHover}
              onMouseLeave={handleRemoveButtonHoverEnd}
              disableRipple
              disableFocusRipple
            >
              {
                (removeButtonHover && <RemoveCircleIcon className={classes.removeButtonIcon} />)
                || (<RemoveCircleOutlineIcon className={classes.removeButtonIcon} />)
              }
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item direction="column" className={classes.footer}>
          {expandList.includes(data.id) && (
            <Grid container direction="column">
              <Grid
                container
                alignItems="flex-end"
                justify="flex-end"
                style={{ backgroundImage: `url(${data.thumbnailURL})` }}
                className={classes.imageSection}
              >
                <Grid item>
                  <img alt="A magnifying glass" src={magnifyingGlass} />
                </Grid>
              </Grid>
              <table className={classes.infoTable}>
                <tbody>
                  <tr>
                    <td className={classes.infoLabel}>
                      <Typography>
                        {intl.formatMessage({ id: 'components.cart.projectName' })}
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
                        {intl.formatMessage({ id: 'components.cart.company' })}
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
          <Grid item style={{ fontSize: '13px' }}>
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
    thumbnailURL: PropTypes.string,
    application: PropTypes.shape({
      name: PropTypes.string,
      companyName: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default CartItem;
