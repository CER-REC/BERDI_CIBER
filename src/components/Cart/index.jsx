import React, { useState, useRef, useEffect } from 'react';
import {
  Button, Drawer, Grid, IconButton, Icon, makeStyles, Typography, ButtonBase,
} from '@material-ui/core';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import { useIntl } from 'react-intl';
import ShareCard from './ShareCard';
import downloadIcon from '../../images/Download.svg';
import shelfIcon from '../../images/cart/shelf.svg';
import useDownloadSize from '../../hooks/useDownloadSize';
import useConfig from '../../hooks/useConfig';
import useCartData from '../../hooks/useCartData';
import fileSizeFormatter from '../../utilities/fileSizeFormatter';
import styles from './styles';
import CartItem from './CartItem';

const useStyles = makeStyles(styles);

const newDotSize = 14;
const newDotR = newDotSize / 2;
const rowSpacing = 20;

const Cart = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const { cartItems } = useCartData();
  const formRef = useRef(null);
  const listRef = useRef(null);
  const rowHeights = useRef({});

  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [removeButtonHover, setRemoveButtonHover] = useState(false);
  const [expandList, setExpandList] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShareOpen(false);
    configDispatch({ type: 'unreadCartIds/removed' });
  };
  const handleDownloadClick = () => formRef.current.submit();
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);
  const handleRemoveAll = () => configDispatch({ type: 'cartIds/removed', payload: config.cartIds });
  const handleRemoveButtonHover = () => setRemoveButtonHover(true);
  const handleRemoveButtonHoverEnd = () => setRemoveButtonHover(false);

  const toggleExpand = (id) => {
    if (expandList.find((entry) => entry === id)) {
      setExpandList((list) => [...list.filter((item) => item !== id)]);
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
  const formattedFileSize = fileSizeFormatter(fileSize, intl.locale);

  const getRowHeight = (index) => rowHeights.current[index] + rowSpacing || 150;

  const onHeightChange = (index, size) => {
    rowHeights.current = { ...rowHeights.current, [index]: size };
    listRef.current.resetAfterIndex(index, true);
  };

  const renderRow = ({ index, style }) => (
    <CartItem
      data={cartItems[index]}
      style={style}
      index={index}
      onHeightChange={onHeightChange}
      expandList={expandList}
      toggleExpand={toggleExpand}
    />
  );

  useEffect(() => {
    setExpandList((list) => [...list.filter((item) => config.cartIds.includes(item))]);
    if (config.cartIds.length === 0) handleShareClose();
  }, [config.cartIds]);

  return (
    <>
      <Button className={classes.cartButton} onClick={handleOpen} variant="contained" size="small">
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
            <Icon style={{ overflow: 'visible' }}>
              <img src={shelfIcon} alt="a shelf holding books" style={{ maxWidth: '1.6em' }} />
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
            <IconButton disabled={config.cartIds.length === 0} aria-label="share" onClick={handleShareOpen} className={classes.headerButton}>
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="close" onClick={handleClose} className={classes.headerButton}>
              <CloseIcon style={{ fontSize: '30px' }} />
            </IconButton>
          </Grid>
          <ShareCard
            open={shareOpen}
            onClose={handleShareClose}
          />
        </Grid>

        {/* Body */}
        <Grid container direction="column" wrap="nowrap" alignContent="flex-end" className={classes.body}>
          <Grid container item style={{ margin: '1em 0 0.5em 0.5em' }}>
            <IconButton
              aria-label="Remove all"
              onClick={handleRemoveAll}
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
            <ButtonBase
              disableRipple
              disableTouchRipple
              onClick={handleRemoveAll}
              onMouseEnter={handleRemoveButtonHover}
              onMouseLeave={handleRemoveButtonHoverEnd}
            >
              <Typography className={classes.removeButtonText}>
                {intl.formatMessage({ id: 'components.cart.removeAll' })}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid container item className={classes.bodyList}>
            <AutoSizer>
              {({ height, width }) => (
                <VariableSizeList
                  ref={listRef}
                  height={height}
                  itemSize={getRowHeight}
                  itemCount={cartItems.length}
                  width={width}
                  overscanCount={5}
                >
                  {renderRow}
                </VariableSizeList>
              )}
            </AutoSizer>
          </Grid>
        </Grid>

        {/* Footer */}
        <Grid
          container
          direction="column"
          alignItems="center"
          className={(config.cartIds.length === 0) ? classes.footerDisabled : classes.footer}
        >
          <Grid item className={classes.footerDisclaimer}>
            <Typography className={classes.disclaimerText}>
              {intl.formatMessage(
                { id: 'components.cart.downloadDisclaimer' },
                {
                  limitationsURL: (
                    <a href={intl.formatMessage({ id: 'common.limitationsURL' })} target="_blank" rel="noopener noreferrer">
                      {intl.formatMessage({ id: 'common.limitations' })}
                    </a>
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
              disableElevation
              variant="contained"
              color="primary"
              className={classes.footerDownloadButton}
              onClick={handleDownloadClick}
            >
              <form ref={formRef} method="post" action={`zip?lang=${intl.locale}`} style={{ display: 'none' }}>
                <input type="hidden" name="ids" value={config.cartIds} />
              </form>
              <img src={downloadIcon} alt="download button" className={classes.footerDownloadButtonIcon} />
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
