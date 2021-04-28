import React, { useMemo, useState } from 'react';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';
import { reportProject } from '../../utilities/analytics';
import ApplicationDialog from '../ApplicationDialog';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#EFEFEF',
    padding: '1.5em',
    margin: '1em 0',
  },
  button: {
    marginRight: '1em',
    minWidth: 'auto',
  },
  title: {
    fontWeight: 700,
    paddingBottom: '0.5em',
    width: '100%',
  },
});

const Applications = () => {
  const [data, setData] = useState(null);
  const classes = useStyles();
  const intl = useIntl();
  const { config: { treemapApplicationIds } } = useConfig();
  const { applications } = useESAData();
  const selectedApplications = useMemo(
    () => treemapApplicationIds.map(
      (id) => applications.find((application) => (application.id === id)),
    ).filter((application) => !!application),
    [treemapApplicationIds, applications],
  );
  const handleClick = (application) => {
    setData(application);
    reportProject(application.shortName);
  };
  const handleClose = () => setData(null);

  if (!selectedApplications.length) {
    return null;
  }

  return (
    <Grid container className={`Applications ${classes.root}`}>
      <ApplicationDialog data={data} onClose={handleClose} />
      <Typography className={classes.title}>
        {intl.formatMessage({ id: 'components.applications.title' })}
      </Typography>
      {
        selectedApplications.map((application) => (
          <Button
            key={application.id}
            className={classes.button}
            color="inherit"
            onClick={() => handleClick(application)}
            disableRipple
          >
            {application.shortName}
          </Button>
        ))
      }
    </Grid>
  );
};

export default Applications;
