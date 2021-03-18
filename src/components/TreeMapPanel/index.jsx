import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useESAData from '../../hooks/useESAData';
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
      <Grid className={classes.titleTypography}>
        <Typography variant="h6">
          {intl.formatMessage({ id: 'components.treeMap.title' })}
        </Typography>
      </Grid>

      <TreeMapDialog open={open} handleClose={handleClose} leafData={selectedBoxData} />

      <Grid className={classes.treeMap}>
        <ResponsiveTreeMapHtml
          root={data}
          identity="shortName"
          value="tableCount"
          valueFormat=".02s"
          orientLabel={false}
          tile="squarify"
          labelSkipSize={0}
          labelTextColor="black"
          borderWidth={3}
          borderColor="#ffffff"
          colors={(d) => d.color}
          onClick={(node) => { setSelectedBoxData(node?.data); handleClickOpen(); }}
          label={(d) => (
            <>
              <div className={classes.emptyPlaceholder} />
              <div className={classes.labelInner}>
                <span style={{ fontSize: '130%', marginTop: '4px' }}>{d.shortName}</span>
              </div>
              <div className={classes.labelInner}>
                <span style={{ whiteSpace: 'nowrap' }}>{`${d.tableCount} ${intl.formatMessage({ id: 'common.tables' })}`}</span>
              </div>
              <div className={classes.labelInner} style={{ paddingTop: '0' }}>
                <span style={{ whiteSpace: 'nowrap' }}>{`${d.figureCount} ${intl.formatMessage({ id: 'common.figures' })}`}</span>
              </div>
            </>
          )}
        />
      </Grid>
    </>
  );
};
export default TreeMapPanel;
