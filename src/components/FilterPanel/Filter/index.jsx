import React, { useCallback } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import useConfig from '../../../hooks/useConfig';
import Dropdown from '../../Dropdown';

const Filter = ({ type, action, options, value, hasHelp }) => {
  const { configDispatch } = useConfig();
  const handleChange = useCallback(
    (items) => configDispatch({ type: action, payload: items }),
    [configDispatch, action],
  );

  return (
    <Grid className="Filter" item xs={4}>
      <Dropdown
        type={type}
        hasHelp={hasHelp}
        options={options}
        onChange={handleChange}
        value={value}
      />
    </Grid>
  );
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasHelp: PropTypes.bool.isRequired,
};

export default Filter;
