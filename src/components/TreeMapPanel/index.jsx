import React from 'react';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import TreeMap from './TreeMap';

const TreeMapPanel = () => {
  const intl = useIntl();
  const { applications } = useESAData();

  if (!applications.length) {
    return null;
  }

  return (
    <>
      <Typography variant="subtitle2">
        {intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })}
      </Typography>
      <TreeMap />
    </>
  );
};

export default TreeMapPanel;
