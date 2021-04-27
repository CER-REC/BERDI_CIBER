import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    height: '100%',
    width: '100%',
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
  checked: { border: '4px solid black' },
  counts: {
    whiteSpace: 'nowrap',
    textTransform: 'lowercase',
  },
  emptyPlaceholder: { width: '100%' },
  title: { fontSize: '130%' },
});

const Node = ({ title, checked, figureCount, tableCount }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={`Node ${classes.root} ${checked ? classes.checked : ''}`}>
      <div className={classes.emptyPlaceholder} />
      <div className={classes.block}>
        <span className={classes.title}>{title}</span>
      </div>
      <div className={classes.block}>
        <span className={classes.counts}>
          {`${intl.formatNumber(tableCount)} ${intl.formatMessage({ id: 'components.treeMap.tableCount' }, { tables: tableCount })}`}
        </span>
      </div>
      <div className={classes.block} style={{ paddingTop: '0' }}>
        <span className={classes.counts}>
          {`${intl.formatNumber(figureCount)} ${intl.formatMessage({ id: 'components.treeMap.figureCount' }, { figures: figureCount })}`}
        </span>
      </div>
    </div>
  );
};

Node.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  figureCount: PropTypes.number.isRequired,
  tableCount: PropTypes.number.isRequired,
};

export default Node;
