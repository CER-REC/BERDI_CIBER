import React, { useState } from 'react';
import { darken, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import isActivateKey from '../../../utilities/isActivateKey';

const noop = () => { };
const debounceMS = 20;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    height: '100%',
    width: '100%',
    '&:focus-visible': {
      backgroundColor: darken(theme.palette.teal.dark, 0.2),
      outline: 'none',
    },
  },
  block: {
    padding: '14px 0 0 14px',
    width: '100%',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      height: '100%',
      display: 'inline-block',
    },
    '& > span': {
      display: 'inline-block',
      float: 'left',
    },
  },
  counts: {
    whiteSpace: 'nowrap',
    textTransform: 'lowercase',
  },
  emptyPlaceholder: { width: '100%' },
  title: { fontSize: '130%' },
}));

const TreeNode = ({ title, figureCount, tableCount, alignmentSheetCount }) => {
  const intl = useIntl();
  const classes = useStyles();
  const [debounceId, setDebounceId] = useState();
  const handleKeyPress = (event) => {
    if (isActivateKey(event)) {
      const target = event.currentTarget;
      const timeoutId = setTimeout(() => target.click(), debounceMS);

      clearTimeout(debounceId);
      setDebounceId(timeoutId);
    }
  };

  // Let click events bubble up to Nivo's node containers
  return (
    <div
      role="button"
      className={`TreeNode ${classes.root}`}
      tabIndex="0"
      onClick={noop}
      onKeyPress={handleKeyPress}
    >
      <div className={classes.emptyPlaceholder} />
      <div className={classes.block}>
        <span className={classes.title}>{title}</span>
      </div>
      <div className={classes.block}>
        <span className={classes.counts}>
          {`${intl.formatNumber(tableCount)} ${intl.formatMessage({ id: 'common.tableCount' }, { tables: tableCount })}`}
        </span>
      </div>
      <div className={classes.block} style={{ paddingTop: '0' }}>
        <span className={classes.counts}>
          {`${intl.formatNumber(figureCount)} ${intl.formatMessage({ id: 'common.figureCount' }, { figures: figureCount })}`}
        </span>
      </div>
      <div className={classes.block} style={{ paddingTop: '0' }}>
        <span className={classes.counts}>
          {`${intl.formatNumber(alignmentSheetCount)} ${intl.formatMessage({ id: 'common.alignmentSheetCount' }, { alignmentSheets: alignmentSheetCount })}`}
        </span>
      </div>
    </div>
  );
};

TreeNode.propTypes = {
  title: PropTypes.string.isRequired,
  figureCount: PropTypes.number.isRequired,
  tableCount: PropTypes.number.isRequired,
  alignmentSheetCount: PropTypes.number.isRequired,
};

export default TreeNode;
