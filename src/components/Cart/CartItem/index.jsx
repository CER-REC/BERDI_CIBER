import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, IconButton, Typography, ListItem, CircularProgress, Button,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useIntl } from 'react-intl';

import clsx from 'clsx';
import useGetFullRegions from '../../../hooks/useGetFullRegions';
import useConfig from '../../../hooks/useConfig';
import { reportCartRemove } from '../../../utilities/analytics';
import ThumbnailButton from '../../ThumbnailButton';
import ViewMoreDetailsButton from '../../ViewMoreDetailsButton';
import NoticeSection from '../../NoticeSection';

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
  rootNotice: {
    ...theme.mixins.noticeAccent,
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
  thumbnail: {
    margin: '1.5em 0',
    width: '50%',
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
  removeButton: {
    '&.Mui-focusVisible': { backgroundColor: theme.palette.action.hover },
  },
  removeButtonIcon: {
    fontSize: '45px',
    color: theme.palette.cart.dark,
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
  projectButton: {
    minWidth: 'auto',
  },
  footer: {
    alignContent: 'flex-start',
  },
}));

const CartItem = ({
  data,
  index,
  onHeightChange,
  expandList,
  toggleExpand,
  onResultsOpen,
  onProjectOpen,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const rowRef = useRef({});
  const { config: { unreadCartIds }, configDispatch } = useConfig();

  const [removeButtonHover, setRemoveButtonHover] = useState(false);
  const handleRemoveButtonHover = () => setRemoveButtonHover(true);
  const handleRemoveButtonHoverEnd = () => setRemoveButtonHover(false);
  const handleRemoveItem = () => {
    configDispatch({ type: 'cartIds/removed', payload: data.id });
    reportCartRemove(data.title);
  };

  const getFullRegions = useGetFullRegions();

  useEffect(() => {
    onHeightChange(index, rowRef.current.clientHeight);
  }, [rowRef.current.clientHeight, index, onHeightChange]);

  if (!data) {
    return (
      <ListItem ref={rowRef}>
        <div className={classes.root} style={{ textAlign: 'center' }}>
          <CircularProgress size={86} />
        </div>
      </ListItem>
    );
  }

  return (
    <ListItem ref={rowRef}>
      <Grid
        className={clsx(classes.root, {
          [classes.rootNew]: unreadCartIds.includes(data.id),
          [classes.rootNotice]: data.hasNotification,
        })}
        onAnimationEnd={() => configDispatch({ type: 'unreadCartIds/removed' })}
      >
        <Grid container wrap="nowrap" className={classes.header}>
          <Grid item xs={10}>
            { data.hasNotification && (
              <NoticeSection />
            )}
            <Typography
              className={(expandList.includes(data.id) ? classes.title : classes.titleTruncated)}
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ margin: '-0.5em' }}>
            <IconButton
              aria-label={intl.formatMessage({ id: 'components.cart.removeTitleAriaText' }, { title: data.title })}
              className={classes.removeButton}
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
              <ThumbnailButton
                className={classes.thumbnail}
                src={data.thumbnailURL}
                onClick={onResultsOpen}
              />
              <table className={classes.infoTable}>
                <tbody>
                  <tr>
                    <td className={classes.infoLabel}>
                      <Typography>
                        {intl.formatMessage({ id: 'common.projectName' })}
                      </Typography>
                    </td>
                    <td>
                      <Button
                        className={classes.projectButton}
                        color="inherit"
                        onClick={() => onProjectOpen(data.application)}
                        disableRipple
                      >
                        {data.application.shortName}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoLabel}>
                      <Typography>
                        {intl.formatMessage({ id: 'common.company' })}
                      </Typography>
                    </td>
                    <td>
                      <Typography>
                        {data.application.companyName}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoLabel}>
                      <Typography>
                        {intl.formatMessage({ id: 'common.region' })}
                      </Typography>
                    </td>
                    <td>
                      <Typography>
                        {getFullRegions(data.application.regions)}
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
      shortName: PropTypes.string,
      companyName: PropTypes.string,
      regions: PropTypes.arrayOf(PropTypes.string),
    }),
    hasNotification: PropTypes.bool,
  }),
  index: PropTypes.number.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  expandList: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleExpand: PropTypes.func.isRequired,
  onResultsOpen: PropTypes.func.isRequired,
  onProjectOpen: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  data: null,
};

export default CartItem;
