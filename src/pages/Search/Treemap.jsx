// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Typography, Grid } from '@material-ui/core';
import data from './mockData';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const TreeMapPanel = () => (
  <>
    <Typography variant="h3"> View results</Typography>
    <Typography variant="h6"> 3,797 figures and 14,549 tables</Typography>

    <Grid container direction="row" justify="space-between" alignItems="center" style={{ backgroundColor: '#e5e5e5' }}>
      <Grid item style={{ paddingLeft: '5px' }}>
        <Typography variant="body1">View by Project</Typography>
      </Grid>

      <Grid item style={{ paddingRight: '5px', textAlign: 'right' }}>
        <Typography variant="body1">Hover to view details.</Typography>
        <Typography variant="body1">Select a box to filter by project</Typography>
      </Grid>
    </Grid>

    <Grid style={{ height: '30vh', backgroundColor: '#63b440', marginTop: '1vh' }}>
      <ResponsiveTreeMap
        root={data}
        identity="name"
        tile="binary"
        value="value"
        valueFormat=".02s"
    // margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        colors={(d) => d.color}
        labelSkipSize={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
        parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
      />
    </Grid>
  </>

);
export default TreeMapPanel;
