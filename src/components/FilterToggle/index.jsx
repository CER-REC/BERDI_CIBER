import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
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
      <Typography variant="subtitle2">
        {intl.formatMessage({ id: 'components.filterToggle.explore' }).toUpperCase()}
      </Typography>
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
