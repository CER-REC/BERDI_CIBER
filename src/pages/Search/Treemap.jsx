import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import React from 'react';
import useESAData from '../../hooks/useESAData';

const useStyles = makeStyles({
  titleTypography: {
    paddingLeft: '5px',
    marginTop: '2%',
  },
  labelInner: {
    padding: '14px 0 0 14px',
    width: '100%',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      height: '100%',
      display: 'inline-block',
    },
    '& > span': {
      display: 'inline-block',
      float: 'left',
    },
  },
  treeMap: {
    // select all Nivo spans but not our custom spans
    '& div:not([class]) > span': {
      display: 'flex',
      flexFlow: 'column wrap',
      height: '100%',
      width: '100%',
    },
    height: '35vh',
  },
  emptyPlaceholder: {
    width: '100%',
  },
});

const TreeMapPanel = () => {
  const data = useESAData('applications');
  const classes = useStyles();
  if (!data) {
    return null;
  }
  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item className={classes.titleTypography}>
          <Typography variant="h6">
            Select a box to filter by project and access project details.
          </Typography>
        </Grid>
      </Grid>

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
          label={(d) => (
            <>
              <div className={classes.emptyPlaceholder} />
              <div className={classes.labelInner}>
                <span style={{ fontSize: '130%', marginTop: '4px' }}>{d.shortName}</span>
              </div>
              <div className={classes.labelInner}>
                <span style={{ whiteSpace: 'nowrap' }}>{`${d.tableCount} tables`}</span>
              </div>
              <div className={classes.labelInner} style={{ paddingTop: '0' }}>
                <span style={{ whiteSpace: 'nowrap' }}>{`${d.figureCount} figures`}</span>
              </div>
            </>
          )}
        />
      </Grid>
    </>
  );
};
export default TreeMapPanel;
