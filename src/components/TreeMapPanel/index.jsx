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
      <Typography variant="h6" style={{ fontWeight: '400', paddingLeft: '0.3em', paddingBottom: '0.5em', paddingTop: '0.8em' }}>
        {intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })}
      </Typography>
      <TreeMap />
    </>
  );
};

export default TreeMapPanel;
