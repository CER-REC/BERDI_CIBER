import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  root: {
    '& p': {
      margin: '0px',
      '&:first-child': { paddingBottom: '0.5em' },
      '&:not(:first-child)': { textTransform: 'lowercase' },
    },
  },
});

const Tooltip = ({ title, figureCount, tableCount }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={`Tooltip ${classes.root}`}>
      <p>{title}</p>
      <p>
        <strong>{intl.formatNumber(tableCount)}</strong>
        {` ${intl.formatMessage({ id: 'components.treeMap.tableCount' }, { tables: tableCount })}`}
      </p>
      <p>
        <strong>{intl.formatNumber(figureCount)}</strong>
        {` ${intl.formatMessage({ id: 'components.treeMap.figureCount' }, { figures: figureCount })}`}
      </p>
    </div>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  figureCount: PropTypes.number.isRequired,
  tableCount: PropTypes.number.isRequired,
};

export default Tooltip;
