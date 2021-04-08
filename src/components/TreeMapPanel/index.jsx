import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { lang } from '../../constants';

import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import { reportProject } from '../../utilities/analytics';
import TreeMapDialog from './TreeMapDialog';
import styles from './TreeMapStyles';

const useStyles = makeStyles(styles);

const TreeMapPanel = () => {
  const { config } = useConfig();
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

  // TODO: break this out into its own util function
  const pluralize = (word, count) => {
    const singular = word === 'figure' ? intl.formatMessage({ id: 'common.content.FIGURE' }) : intl.formatMessage({ id: 'common.content.TABLE' });
    const plural = word === 'figue' ? intl.formatMessage({ id: 'common.figures' }) : intl.formatMessage({ id: 'common.tables' });
    if (lang === 'fr') {
      return count > 1 ? plural : singular;
    }
    return count === 1 ? singular : plural;
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Grid className={classes.titleTypography}>
        <Typography>
          {intl.formatMessage({ id: 'components.treeMap.title' })}
        </Typography>
      </Grid>

      <TreeMapDialog open={open} handleClose={handleClose} leafData={selectedBoxData} />

      <Grid className={classes.treeMap}>
        <ResponsiveTreeMapHtml
          tooltip={(application) => (
            <div className={classes.tooltip}>
              <p>{ application.data.shortName }</p>
              <p>
                <strong>{application.data.tableCount}</strong>
                {` ${pluralize('table', application.data.tableCount)}`}
              </p>
              <p>
                <strong>{application.data.figureCount}</strong>
                {` ${pluralize('figure', application.data.figureCount)}`}
              </p>
            </div>
          )}
          root={data}
          identity="shortName"
          value="totalCount"
          valueFormat=".02s"
          orientLabel={false}
          tile="squarify"
          labelSkipSize={0}
          labelTextColor="black"
          borderWidth={3}
          borderColor="#ffffff"
          colors={(d) => d.color}
          onClick={
            (node) => {
              reportProject(
                config.regions,
                config.commodities,
                config.projectTypes,
                config.statuses,
                node.data.name,
              );
              setSelectedBoxData(node.data);
              handleClickOpen();
            }
          }
          label={(d) => (
            <>
              <div className={classes.emptyPlaceholder} />
              <div className={classes.labelInner}>
                <span className={classes.labelInnerTitle}>{d.shortName}</span>
              </div>
              <div className={classes.labelInner}>
                <span className={classes.labelInnerCounts}>{`${d.tableCount} ${pluralize('table', d.tableCount)}`}</span>
              </div>
              <div className={classes.labelInner} style={{ paddingTop: '0' }}>
                <span className={classes.labelInnerCounts}>{`${d.figureCount} ${pluralize('figure', d.figureCount)}`}</span>
              </div>
            </>
          )}
        />
      </Grid>
    </>
  );
};
export default TreeMapPanel;
