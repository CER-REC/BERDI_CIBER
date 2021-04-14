import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import { reportProject } from '../../utilities/analytics';
import TreeMapDialog from './TreeMapDialog';
import styles from './TreeMapStyles';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles(styles);

const TreeMapPanel = () => {
  const { applications: data, loading } = useESAData();
  const intl = useIntl();
  const classes = useStyles();
  const { config } = useConfig();

  const [open, setOpen] = useState(false);
  const [selectedBoxData, setSelectedBoxData] = useState(null);

  const combinedSearches = config.searches.join(' ');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!data && loading) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" className={classes.countsTitle}>
        {intl.formatMessage({ id: 'components.treeMap.title' })}
      </Typography>

      {!data
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
                tables: data.tableCount,
                figures: data.figureCount,
              })}
            </Typography>
            <Typography style={{ padding: '0.5em 0 0.2em 0' }}>
              {intl.formatMessage({ id: 'components.treeMap.boxSelectText' })}
            </Typography>

            <TreeMapDialog open={open} handleClose={handleClose} leafData={selectedBoxData} />

            <Grid className={classes.treeMap}>
              <ResponsiveTreeMapHtml
                tooltip={(application) => (
                  <div className={classes.tooltip}>
                    <p>{ application.data.shortName }</p>
                    <p>
                      {intl.formatMessage({ id: 'components.treeMap.tableCount' },
                        {
                          count: <strong>{application.data.tableCount}</strong>,
                          tables: application.data.tableCount,
                        })}
                    </p>
                    <p>
                      {intl.formatMessage({ id: 'components.treeMap.figureCount' },
                        {
                          count: <strong>{application.data.figureCount}</strong>,
                          figures: application.data.figureCount,
                        })}
                    </p>
                  </div>
                )}
                root={data}
                identity="shortName"
                value="totalCount"
                valueFormat=".02s"
                orientLabel={false}
                tile="squarify"
                labelSkipSize={0}
                labelTextColor="black"
                borderWidth={3}
                borderColor="#ffffff"
                colors={(d) => d.color}
                onClick={
            (node) => {
              reportProject(node.data.shortName);
              setSelectedBoxData(node.data);
              handleClickOpen();
            }
          }
                label={(d) => (
                  <>
                    <div className={classes.emptyPlaceholder} />
                    <div className={classes.labelInner}>
                      <span className={classes.labelInnerTitle}>{d.shortName}</span>
                    </div>
                    <div className={classes.labelInner}>
                      <span className={classes.labelInnerCounts}>
                        {intl.formatMessage({ id: 'components.treeMap.tableCount' }, { count: d.tableCount, tables: d.tableCount })}
                      </span>
                    </div>
                    <div className={classes.labelInner} style={{ paddingTop: '0' }}>
                      <span className={classes.labelInnerCounts}>
                        {intl.formatMessage({ id: 'components.treeMap.figureCount' }, { count: d.figureCount, figures: d.figureCount })}
                      </span>
                    </div>
                  </>
                )}
              />
            </Grid>
          </>
        ) }
    </>
  );
};
export default TreeMapPanel;
