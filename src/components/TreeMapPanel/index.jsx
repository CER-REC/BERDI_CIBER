import React, { useCallback, useState } from 'react';
import { Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useESAData from '../../hooks/useESAData';
import TreeMap from './TreeMap';
import NoResultsStatusMessages from './NoResultsStatusMessages';
import LimitationsDialog from '../LimitationsDialog';

const useStyles = makeStyles({
  title: {
    fontSize: '36px',
    paddingTop: '0.5em',
    fontWeight: '400',
  },
  body: {
    fontSize: '24px',
    paddingTop: '0.2em',
    fontWeight: '400',
  },
});

const TreeMapPanel = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { applications, loading } = useESAData();
  const figureCount = applications.reduce(
    (count, application) => (application.figureCount + count),
    0,
  );
  const tableCount = applications.reduce(
    (count, application) => (application.tableCount + count),
    0,
  );

  const [open, setOpen] = useState(false);
  const handleButtonClick = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  if (!applications.length && loading) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {intl.formatMessage({ id: 'components.treeMapPanel.title' })}
      </Typography>
      {
        // Show actual results
        (applications.length && (
          <>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" className={classes.body}>
                  {intl.formatMessage({ id: 'components.treeMapPanel.counts' }, {
                    tables: tableCount,
                    figures: figureCount,
                  })}
                </Typography>
                <Typography style={{ padding: '0.5em 0 0.2em 0' }}>
                  {intl.formatMessage({ id: 'components.treeMapPanel.boxSelect' })}
                </Typography>
              </Grid>

              <Grid item>
                <Button color="primary" variant="contained" disableElevation onClick={handleButtonClick}>
                  {intl.formatMessage({ id: 'components.resultsList.dataButton.label' })}
                </Button>
                <LimitationsDialog
                  open={open}
                  hasDownload
                  onClose={handleClose}
                />
              </Grid>
            </Grid>

            <TreeMap />
          </>
        ))
        // Or show no results messages
        || <NoResultsStatusMessages />
      }
    </>
  );
};

export default TreeMapPanel;
