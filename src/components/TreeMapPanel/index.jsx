import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import { reportProject } from '../../utilities/analytics';
import TreeMapDialog from './TreeMapDialog';
import styles from './TreeMapStyles';

const useStyles = makeStyles(styles);

const TreeMapPanel = () => {
  const { applications: data } = useESAData();
  const intl = useIntl();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedBoxData, setSelectedBoxData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" className={classes.countsTitle}>
        {intl.formatMessage({ id: 'components.treeMap.title' })}
      </Typography>
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
                <strong>{application.data.tableCount}</strong>
                {` ${intl.formatMessage({ id: 'common.tables' })}`}
              </p>
              <p>
                <strong>{application.data.figureCount}</strong>
                {` ${intl.formatMessage({ id: 'common.figures' })}`}
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
                <span className={classes.labelInnerCounts}>{`${d.tableCount} ${intl.formatMessage({ id: 'common.tables' })}`}</span>
              </div>
              <div className={classes.labelInner} style={{ paddingTop: '0' }}>
                <span className={classes.labelInnerCounts}>{`${d.figureCount} ${intl.formatMessage({ id: 'common.figures' })}`}</span>
              </div>
            </>
          )}
        />
      </Grid>
    </>
  );
};
export default TreeMapPanel;
