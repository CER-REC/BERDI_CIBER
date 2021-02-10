// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import data from './mockData';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyTreeMap = () => (
  <ResponsiveTreeMap
    root={data}
    identity="name"
    value="loc"
    valueFormat=".02s"
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    labelSkipSize={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
    parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
  />
);
export default MyTreeMap;
