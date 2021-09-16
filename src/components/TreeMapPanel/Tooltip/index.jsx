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

const Tooltip = ({ title, figureCount, tableCount, alignmentSheetCount }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={`Tooltip ${classes.root}`}>
      <p>{title}</p>
      <p>
        <strong>{intl.formatNumber(tableCount)}</strong>
        {` ${intl.formatMessage({ id: 'common.tableCount' }, { tables: tableCount })}`}
      </p>
      <p>
        <strong>{intl.formatNumber(figureCount)}</strong>
        {` ${intl.formatMessage({ id: 'common.figureCount' }, { figures: figureCount })}`}
      </p>
      <p>
        <strong>{intl.formatNumber(alignmentSheetCount)}</strong>
        {` ${intl.formatMessage({ id: 'common.alignmentSheetCount' }, { alignmentSheets: alignmentSheetCount })}`}
      </p>
    </div>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  figureCount: PropTypes.number.isRequired,
  tableCount: PropTypes.number.isRequired,
  alignmentSheetCount: PropTypes.number.isRequired,
};

export default Tooltip;
