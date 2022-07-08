import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import TreeMap from './TreeMap';

const useStyles = makeStyles(() => ({
  selectText: {
    fontSize: 20,
    lineHeight: 'normal',
    padding: '0.8em 0 0.5em 0.3em',
    fontWeight: 'lighter',
  },
}));

const TreeMapPanel = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { applications } = useESAData();

  if (!applications.length) {
    return null;
  }

  return (
    <>
      <Typography className={classes.selectText}>
        {intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })}
      </Typography>
      <TreeMap />
    </>
  );
};

export default TreeMapPanel;
