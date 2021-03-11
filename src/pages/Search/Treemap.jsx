// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Typography, Grid } from '@material-ui/core';
import useESAData from '../../hooks/useESAData';

const TreeMapPanel = () => {
  const { applications: data } = useESAData();

  if (!data) {
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
          root={data}
          identity="shortName"
          tile="squarify"
          value="tableCount"
          valueFormat=".02s"
          orientLabel={false}
          colors={(d) => d.color}
          labelSkipSize={40}
          labelTextColor="white"
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          borderWidth={2}
        />
      </Grid>
    </>

  );
};
export default TreeMapPanel;
