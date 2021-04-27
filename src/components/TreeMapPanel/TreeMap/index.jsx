import React, { useMemo } from 'react';
import { Grid, lighten, makeStyles, useTheme } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';

import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import { reportProject } from '../../../utilities/analytics';
import Node from '../Node';
import Tooltip from '../Tooltip';

const lightenCoefficient = 0.613;

const getColor = (application) => application.color;
const getLabel = (application) => (
  <Node
    title={application.shortName}
    checked={application.selected}
    figureCount={application.figureCount}
    tableCount={application.tableCount}
  />
);
const getTooltip = (node) => (
  <Tooltip
    title={node.data.shortName}
    figureCount={node.data.figureCount}
    tableCount={node.data.tableCount}
  />
);
const formatData = (applications, ids, baseColor) => {
  const sortedApplications = applications.sort(
    (a, b) => (b.tableCount + b.figureCount) - (a.tableCount + a.figureCount),
  );
  const largestCount = sortedApplications[0].tableCount + sortedApplications[0].figureCount;
  const data = sortedApplications.map((application) => {
    const totalCount = application.tableCount + application.figureCount;
    const percentage = (totalCount / largestCount);
    const color = lighten(baseColor, lightenCoefficient * (1 - percentage));

    return {
      ...application,
      color,
      totalCount,
      selected: ids.includes(application.id),
    };
  });

  return {
    id: 'esaData',
    children: data,
  };
};
const useStyles = makeStyles({
  root: {
    // Select all Nivo spans but not our custom spans
    '& div:not([class]) > span': {
      height: '100%',
      width: '100%',
    },
    height: '35vh',
  },
});

const TreeMap = () => {
  const { applications } = useESAData();
  const classes = useStyles();
  const { config: { treemapApplicationIds }, configDispatch } = useConfig();
  const theme = useTheme();
  const data = useMemo(
    () => formatData(applications, treemapApplicationIds, theme.palette.secondary.main),
    [applications, treemapApplicationIds, theme.palette.secondary.main],
  );
  const handleClick = (node) => {
    if (node.data.selected) {
      configDispatch({ type: 'treemapApplicationIds/removed', payload: node.id });
    } else {
      configDispatch({ type: 'treemapApplicationIds/added', payload: node.id });
    }

    // TODO: Update GTM event for TreeMap filter
    reportProject(node.data.shortName);
  };

  return (
    <Grid className={`TreeMap ${classes.root}`}>
      <ResponsiveTreeMapHtml
        tooltip={getTooltip}
        root={data}
        value="totalCount"
        valueFormat=".02s"
        orientLabel={false}
        tile="squarify"
        labelSkipSize={0}
        labelTextColor="black"
        borderWidth={3}
        borderColor="#FFFFFF"
        colors={getColor}
        onClick={handleClick}
        label={getLabel}
      />
    </Grid>
  );
};
export default TreeMap;
