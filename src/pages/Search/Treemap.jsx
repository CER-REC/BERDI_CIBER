// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import React from 'react';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import useESAData from '../../hooks/useESAData';

const useStyles = makeStyles({
  labelInner: {
    padding: '10px 0 0 10px',
    width: '100%',
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
    wordWrap: 'break-word',
  },
  treeMap: {
    // select all Nivo spans but not our custom spans
    '& div:not([class]) > span': {
      display: 'flex',
      flexFlow: 'column wrap',
      height: '100%',
      width: '100%',
    },
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
        <Grid item style={{ paddingLeft: '5px', marginTop: '2%' }}>
          <Typography
            variant="h6"
            style={{
              fontFamily: 'Noto Sans',
              fontStyle: 'normal',
              fontWeight: 'normal',
            }}
          >
            Select a box to filter by project and access project details.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        style={{ height: '35vh' }}
        className={classes.treeMap}
      >
        <ResponsiveTreeMapHtml
          root={data}
          identity="shortName"
          value="tableCount"
          valueFormat=".02s"
          orientLabel={false}
          tile="squarify"
          label={(d) => (
            <>
              <div className="emptyPlaceholder" style={{ width: '100%' }} />
              <div className={classes.labelInner}>
                <span style={{ fontSize: '130%' }}>{d.shortName}</span>
              </div>

              <div className={classes.labelInner}>
                <span style={{ display: 'block', marginTop: '5%' }}>{`${d.tableCount} tables`}</span>
              </div>

              <div className={classes.labelInner}>
                <span style={{ display: 'block' }}>{`${d.figureCount} figures`}</span>
              </div>

            </>
          )}
          labelSkipSize={0}
          labelTextColor="black"
          borderWidth={3}
          borderColor="#ffffff"
          // isInteractive={false}
          colors={(d) => d.color}
        />
      </Grid>
      <Grid style={{ padding: '5px', textAlign: 'right' }}>
        <Button style={{
          height: '1%',
          textTransform: 'none',
          background: '#284162',
          borderRadius: '5px',
          color: 'white',
          padding: '0.5% 2%',
        }}
        >
          Access full dataset
        </Button>
      </Grid>
    </>

  );
};
export default TreeMapPanel;
