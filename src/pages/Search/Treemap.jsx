// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import React from 'react';
import { ResponsiveTreeMap, ResponsiveTreeMapHtml } from '@nivo/treemap';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import useESAData from '../../hooks/useESAData';
import mockData from './mockData';

const useStyles = makeStyles({
  treeMap: {
    '& text': {
      transform: 'translate(1%,6%)',
      textAnchor: 'start',
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
      {/* <Typography variant="h3"> View results</Typography> */}
      {/* <Typography variant="h6"> 3,797 figures and 14,549 tables</Typography> */}

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

        {/* <Grid item style={{ paddingRight: '5px', textAlign: 'right' }}>
          <Typography variant="body1">Hover to view details.</Typography>
          <Typography variant="body1">Select a box to filter by project</Typography>
        </Grid> */}
      </Grid>

      {/* <Grid
        style={{ height: '35vh' }}
        className={classes.treeMap}
      >
        <ResponsiveTreeMap
          root={data}
          identity="shortName"
          tile="squarify"
          value="tableCount"
          valueFormat=".02s"
          orientLabel={false}
          colors={(d) => d.color}
          label={(d) => (
            <>
              <tspan style={{ fontSize: '200%' }}>{d.shortName}</tspan>
              <tspan x="5" y="30">{`${d.tableCount} tables`}</tspan>
              <tspan x="5" y="50">{`${d.figureCount} figures`}</tspan>
            </>
          )}
          labelSkipSize={80}
          labelTextColor="black"
          borderWidth={3}
          borderColor="#ffffff"
          isInteractive={false}
        />
      </Grid> */}
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
          labelSkipSize={80}
          labelTextColor="black"
          borderWidth={3}
          borderColor="#ffffff"
          isInteractive={false}
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
