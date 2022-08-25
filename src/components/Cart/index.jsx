import {
  Button, Drawer, Grid, Icon, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ShareIcon from '@material-ui/icons/Share';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import mergeRefs from 'react-merge-refs';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import clsx from 'clsx';
import useConfig from '../../hooks/useConfig';
import useDownloadSize from '../../hooks/useDownloadSize';
import useLazyCartData from '../../hooks/useLazyCartData';
import rightArrow from '../../images/cart/rightArrow.png';
import shelfIcon from '../../images/cart/shelf.svg';
import downloadIcon from '../../images/Download.svg';
import { reportCartDownload, reportCartOpen, reportCartRemoveAll, reportDisclaimer, reportProject } from '../../utilities/analytics';
import fileSizeFormatter from '../../utilities/fileSizeFormatter';
import ApplicationDialog from '../ApplicationDialog';
import LimitationsDialog from '../LimitationsDialog';
import ResultDialog from '../ResultDialog';
import CartItem from './CartItem';
import ShareCard from './ShareCard';
import styles from './styles';

const useStyles = makeStyles(styles);

const newDotSize = 14;
const newDotR = newDotSize / 2;
const preloadCount = 20;
const debounceMS = 1000;

const Cart = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const { cartItems, loadContents, isContentLoaded } = useLazyCartData();
  const formRef = useRef(null);
  const listRef = useRef(null);
  const rowHeights = useRef({});
  const infiniteLoaderRef = useRef();

  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [limitationsOpen, setLimitationsOpen] = useState(false);
  const [removeButtonHover, setRemoveButtonHover] = useState(false);
  const [expandList, setExpandList] = useState([]);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [resultsData, setResultsData] = useState();
  const [projectData, setProjectData] = useState();
  const isEmpty = config.cartIds.length === 0;

  const handleOpen = () => {
    setOpen(true);
    reportCartOpen();
  };
  const handleClose = () => {
    setOpen(false);
    setShareOpen(false);
    configDispatch({ type: 'unreadCartIds/removed' });
  };
  const handleDownloadClick = () => {
    formRef.current.submit();
    reportCartDownload();
  };
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);
  const handleRemoveAll = () => {
    configDispatch({ type: 'cartIds/removed', payload: config.cartIds });
    reportCartRemoveAll();
  };
  const handleRemoveButtonHover = () => setRemoveButtonHover(true);
  const handleRemoveButtonHoverEnd = () => setRemoveButtonHover(false);

  const handleLimitationsOpen = () => {
    reportDisclaimer();
    setLimitationsOpen(true);
  };
  const handleLimitationsClose = () => setLimitationsOpen(false);

  const toggleExpand = (id) => {
    if (expandList.find((entry) => entry === id)) {
      setExpandList((list) => list.filter((item) => item !== id));
    } else {
      setExpandList((list) => [...list, id]);
    }
  };

  const cartQuantity = (() => {
    const quantity = config.cartIds.length;
    return (quantity >= 1000)
      ? `${Number((quantity / 1000).toFixed(1)).toLocaleString(intl.locale)}k`
      : quantity;
  })();

  let { fileSize } = useDownloadSize(config.cartIds);
  // TODO: remove this once API is updated to handle 0 sizes
  if (config.cartIds.length === 0) fileSize = 0;
  const formattedFileSize = fileSizeFormatter(fileSize, intl);

  const getRowHeight = (index) => rowHeights.current[index] || 150;

  const onHeightChange = (index, size) => {
    const hasChanged = rowHeights.current[index] !== size;
    if (hasChanged) {
      rowHeights.current[index] = size;
      listRef.current.resetAfterIndex(index, true);
    }
  };

  const onResultsOpen = (index) => {
    setResultsData(cartItems[index]);
    setResultsOpen(true);
  };

  const handleProjectClick = (application) => {
    setProjectData(application);
    reportProject(application.shortName);
  };

  const renderRow = ({ index, style }) => (
    <div style={style}>
      <CartItem
        data={cartItems[index]}
        index={index}
        onHeightChange={onHeightChange}
        expandList={expandList}
        toggleExpand={toggleExpand}
        onResultsOpen={() => onResultsOpen(index)}
        onProjectOpen={handleProjectClick}
      />
    </div>
  );

  useEffect(() => {
    setExpandList((list) => list.filter((item) => config.cartIds.includes(item)));
    if (config.cartIds.length === 0) handleShareClose();
  }, [config.cartIds]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    // TODO: Move to use loadMoreItems over referencing the last rendered indexes
    // There's an issue with InfiniteLoader's loadMoreItems not being called
    // in certain conditions (such as shrinkage of the list at certain scroll positions),
    // possibly due to how the event works with the virtualized scrollbar with large lists
    const interval = setInterval(() => {
      // eslint-disable-next-line no-underscore-dangle
      const start = infiniteLoaderRef.current?._lastRenderedStartIndex - preloadCount;
      // eslint-disable-next-line no-underscore-dangle
      const end = infiniteLoaderRef.current?._lastRenderedStopIndex + preloadCount;
      const contentIds = config.cartIds.slice(Math.max(start, 0), end + 1);

      loadContents(contentIds);
    }, debounceMS);

    return () => clearInterval(interval);
  }, [open, config.cartIds, loadContents]);

  return (
    <>
      <LimitationsDialog
        open={limitationsOpen}
        onClose={handleLimitationsClose}
      />
      <ResultDialog
        open={resultsOpen}
        onClose={() => setResultsOpen(false)}
        data={resultsData}
      />
      <ApplicationDialog data={projectData} onClose={() => setProjectData(null)} />
      <Button
        aria-label={intl.formatMessage({ id: 'components.cart.shelfAriaText' }, { num: cartQuantity })}
        className={classes.cartButton}
        onClick={handleOpen}
        variant="contained"
        size="small"
        disableElevation={false}
      >
        <svg
          height={newDotSize}
          width={newDotSize}
          viewBox={`0 0 ${newDotSize} ${newDotSize}`}
          className={(config.unreadCartIds.length === 0) ? classes.newDotHidden : classes.newDot}
        >
          <circle cx={newDotR} cy={newDotR} r={newDotR} />
        </svg>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={6}>
            <Icon
              style={{ overflow: 'visible' }}
            >
              <img src={shelfIcon} alt={intl.formatMessage({ id: 'components.cart.shelfAltText' })} style={{ maxWidth: '1.6em' }} />
            </Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.cartButtonLabel}>
              {cartQuantity}
            </Typography>
          </Grid>
        </Grid>
      </Button>
      <Drawer
        anchor="right"
        open={open}
        classes={{ paper: classes.drawer }}
        style={{ position: 'initial' }}
        disableScrollLock
        hideBackdrop
        disableEnforceFocus
      >
        {/* Header */}
        <Grid container alignItems="center" className={classes.header}>
          <Grid item xs={9}>
            <Typography className={classes.headerQuantity}>
              {`(${cartQuantity}) ${intl.formatMessage({ id: 'components.cart.headerQuantity' })}`}
            </Typography>
            <a href="stub" className={classes.headerLink}>
              {intl.formatMessage({ id: 'components.cart.viewFullList' })}
            </a>
          </Grid>
          <Grid item container xs={3} className={classes.headerButtonContainer}>
            <IconButton aria-label={intl.formatMessage({ id: 'components.cart.shareAltText' })} onClick={handleShareOpen} className={classes.headerButton}>
              <ShareIcon />
            </IconButton>
            <IconButton aria-label={intl.formatMessage({ id: 'components.cart.collapseShelfAriaText' })} onClick={handleClose} className={classes.headerButton}>
              <img src={rightArrow} alt={intl.formatMessage({ id: 'components.cart.collapseShelfAltText' })} />
            </IconButton>
          </Grid>
          <ShareCard
            open={shareOpen}
            onClose={handleShareClose}
          />
        </Grid>

        {/* Body */}
        <Grid container direction="column" wrap="nowrap" className={classes.body}>
          <Grid item style={{ margin: '1em 0 0.5em 0.5em' }}>
            <Button
              aria-label={intl.formatMessage({ id: 'components.cart.removeAll' })}
              classes={{
                root: classes.removeButton,
                label: classes.removeButtonText,
              }}
              disabled={isEmpty}
              onClick={handleRemoveAll}
              onMouseEnter={handleRemoveButtonHover}
              onMouseLeave={handleRemoveButtonHoverEnd}
              disableRipple
            >
              {
                (removeButtonHover && <RemoveCircleIcon className={classes.removeButtonIcon} />)
                || (<RemoveCircleOutlineIcon className={classes.removeButtonIcon} />)
              }
              {intl.formatMessage({ id: 'components.cart.removeAll' })}
            </Button>
          </Grid>
          <Grid item className={clsx(classes.bodyList, { [classes.bodyListEmpty]: isEmpty })}>
            { isEmpty && (<Typography style={{ fontSize: '1.2em' }}>{intl.formatMessage({ id: 'components.cart.noItems' })}</Typography>) }
            <AutoSizer>
              {({ height, width }) => (
                <InfiniteLoader
                  ref={infiniteLoaderRef}
                  isItemLoaded={isContentLoaded}
                  itemCount={config.cartIds.length}
                  loadMoreItems={() => { }}
                >
                  {({ onItemsRendered, ref: infiniteLoaderListRef }) => (
                    <VariableSizeList
                      ref={mergeRefs([listRef, infiniteLoaderListRef])}
                      height={height}
                      itemSize={getRowHeight}
                      itemCount={config.cartIds.length}
                      width={width}
                      onItemsRendered={onItemsRendered}
                    >
                      {renderRow}
                    </VariableSizeList>
                  )}
                </InfiniteLoader>
              )}
            </AutoSizer>
          </Grid>
        </Grid>

        {/* Footer */}
        <Grid
          container
          direction="column"
          alignItems="center"
          className={isEmpty ? classes.footerDisabled : classes.footer}
        >
          <Grid item className={classes.footerDisclaimer}>
            <Typography className={classes.disclaimerText}>
              {intl.formatMessage(
                { id: 'components.cart.downloadDisclaimer' },
                {
                  limitationsURL: (
                    <Button color="secondary" disabled={isEmpty} onClick={handleLimitationsOpen} disableRipple>
                      {intl.formatMessage({ id: 'common.limitations' })}
                    </Button>
                  ),
                },
              )}
            </Typography>
            <Typography className={classes.disclaimerText}>
              {intl.formatMessage({ id: 'components.cart.dataDisclaimer' })}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={isEmpty}
              className={classes.footerDownloadButton}
              onClick={handleDownloadClick}
            >
              <form ref={formRef} method="post" action={`zip?lang=${intl.locale}`} style={{ display: 'none' }}>
                <input type="hidden" name="ids" value={config.cartIds} />
              </form>
              <img src={downloadIcon} alt={intl.formatMessage({ id: 'common.downloadAltText' })} className={classes.footerDownloadButtonIcon} />
              <span>{intl.formatMessage({ id: 'common.downloadAllTables' })}</span>
              <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                {formattedFileSize}
              </span>
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default Cart;
