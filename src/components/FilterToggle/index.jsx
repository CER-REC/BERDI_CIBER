import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import { reportFilterToggle } from '../../utilities/analytics';

const useStyles = makeStyles({
  toggleButton: {
    width: '50%',
  },
});

const FilterToggle = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { config: { filter }, configDispatch } = useConfig();
  const handleChange = (event, value) => {
    if (value !== null) {
      configDispatch({ type: 'filter/changed', payload: value });
      reportFilterToggle(value);
    }
  };

  return (
    <div style={{ paddingLeft: '0.3em' }}>
      <Grid container justify="space-between" style={{ padding: '1em 0 0.5em' }}>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.filterToggle.explore' }).toUpperCase()}
        </Typography>
      </Grid>
      <ToggleButtonGroup
        value={filter}
        onChange={handleChange}
        exclusive
        style={{ width: '100%' }}
      >
        <ToggleButton value="topic" className={classes.toggleButton}>
          { intl.formatMessage({ id: 'common.topic' }) }
        </ToggleButton>
        <ToggleButton value="project" className={classes.toggleButton}>
          { intl.formatMessage({ id: 'common.project' }) }
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default FilterToggle;
