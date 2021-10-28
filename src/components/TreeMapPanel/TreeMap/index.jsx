import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import React, { useMemo } from 'react';
import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';
import { reportFilter } from '../../../utilities/analytics';
import Tooltip from '../Tooltip';
import TreeNode from '../TreeNode';

const getLabel = (application) => (
  <TreeNode
    title={application.shortName}
    figureCount={application.figureCount}
    tableCount={application.tableCount}
    alignmentSheetCount={application.alignmentSheetCount}
  />
);
const getTooltip = (node) => (
  <Tooltip
    title={node.data.shortName}
    figureCount={node.data.figureCount}
    tableCount={node.data.tableCount}
    alignmentSheetCount={node.data.alignmentSheetCount}
  />
);
const formatData = (applications, ids) => {
  const sortedTotalCountApplications = applications.map((application) => ({
    ...application,
    totalCount: application.tableCount + application.figureCount + application.alignmentSheetCount,
  })).sort((applicationA, applicationB) => (applicationB.totalCount - applicationA.totalCount));
  const data = sortedTotalCountApplications.map((application) => ({
    ...application,
    selected: ids.includes(application.id),
  }));

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

  const getColor = (application) => (
    application.selected
      ? theme.palette.teal.dark
      : theme.palette.cart.light
  );

  const handleClick = (node) => {
    if (node.data.selected) {
      configDispatch({ type: 'treemapApplicationIds/removed', payload: node.id });
    } else {
      configDispatch({ type: 'treemapApplicationIds/added', payload: node.id });
    }

    reportFilter('treemap', node.data.shortName, !node.data.selected);
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
