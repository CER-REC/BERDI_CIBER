import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import TreeMap from './TreeMap';
import styles from './TreeMapStyles';

const useStyles = makeStyles(styles);

const TreeMapPanel = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { config } = useConfig();
  const { applications, loading } = useESAData();
  const combinedSearches = config.searches.join(' ');
  const figureCount = applications.reduce(
    (count, application) => (application.figureCount + count),
    0,
  );
  const tableCount = applications.reduce(
    (count, application) => (application.tableCount + count),
    0,
  );

  if (!applications.length && loading) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" className={classes.countsTitle}>
        {intl.formatMessage({ id: 'components.treeMap.title' })}
      </Typography>

      {!applications.length
        ? (
          <Typography variant="h6" style={{ fontWeight: '200' }}>
            {intl.formatMessage({ id: 'components.treeMap.noResultsText' }, {
              searches: (<strong style={{ fontWeight: '700' }}>{combinedSearches}</strong>),
            })}
          </Typography>
        )
        : (
          <>
            <Typography variant="h6" className={classes.countsText}>
              {intl.formatMessage({ id: 'components.treeMap.countsText' }, {
                tables: tableCount,
                figures: figureCount,
              })}
            </Typography>
            <Typography style={{ padding: '0.5em 0 0.2em 0' }}>
              {intl.formatMessage({ id: 'components.treeMap.boxSelectText' })}
            </Typography>
            <TreeMap />
          </>
        ) }
    </>
  );
};

export default TreeMapPanel;
