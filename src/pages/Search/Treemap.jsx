// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Typography, Grid } from '@material-ui/core';
import data from './mockData';
import useESAData from '../../hooks/useESAData';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const TreeMapPanel = () => {
  const d = useESAData('applications');
  console.log(d);
  // if (d) {
  //   return null;
  // }
  if (!d) {
    return null;
  }
  return (
    <>
      <Typography variant="h3"> View results</Typography>
      <Typography variant="h6"> 3,797 figures and 14,549 tables</Typography>

      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item style={{ paddingLeft: '5px' }}>
          <Typography variant="body1">View by Project</Typography>
        </Grid>

        <Grid item style={{ paddingRight: '5px', textAlign: 'right' }}>
          <Typography variant="body1">Hover to view details.</Typography>
          <Typography variant="body1">Select a box to filter by project</Typography>
        </Grid>
      </Grid>

      <Grid style={{ height: '30vh', marginTop: '1vh' }}>
        <ResponsiveTreeMap
          root={d}
          identity="shortName"
          tile="squarify"
          value="tableCount"
          valueFormat=".02s"
          orientLabel={false}
          // margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          colors={(datum) => console.log(datum.color) || datum.color}
          // colors={{ scheme: 'blues' }}
          labelSkipSize={40}
          labelTextColor="white"
          // parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          borderWidth={2}
        />
      </Grid>
    </>

  );
};
export default TreeMapPanel;
