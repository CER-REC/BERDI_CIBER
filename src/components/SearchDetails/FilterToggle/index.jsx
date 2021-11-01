import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import { reportFilterToggle } from '../../../utilities/analytics';

const FilterToggle = () => {
  const intl = useIntl();
  const { config: { filter }, configDispatch } = useConfig();
  const handleChange = (event, value) => {
    if (value !== null) {
      configDispatch({ type: 'filter/changed', payload: value });
      reportFilterToggle(value);
    }
  };

  return (
    <ToggleButtonGroup
      value={filter}
      onChange={handleChange}
      exclusive
    >
      <ToggleButton value="topic">
        { intl.formatMessage({ id: 'common.topic' }) }
      </ToggleButton>
      <ToggleButton value="project">
        { intl.formatMessage({ id: 'common.project' }) }
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FilterToggle;
