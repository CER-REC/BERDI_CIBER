import React from 'react';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import SelectHelpText from '../SelectHelpText';
import TreeMap from './TreeMap';

const TreeMapPanel = () => {
  const intl = useIntl();
  const { applications } = useESAData();

  if (!applications.length) {
    return null;
  }

  return (
    <>
      <SelectHelpText text={intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })} />
      <TreeMap />
    </>
  );
};

export default TreeMapPanel;
