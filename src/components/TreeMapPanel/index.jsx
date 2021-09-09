import React from 'react';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import TreeMap from './TreeMap';

const TreeMapPanel = () => {
  const intl = useIntl();
  const { applications, loading } = useESAData();

  if (!applications.length && loading) {
    return null;
  }

  return (
    // Show actual results
    (applications.length && (
    <>
      <Typography style={{ padding: '0.5em 0 0.2em 0' }}>
        {intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })}
      </Typography>
      <TreeMap />
    </>
    ))
  );
};

export default TreeMapPanel;
