import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    color: '#3d6a88',
  },
}));

const getDropdownItemName = (title, name) => {
  switch (title) {
    case 'REGIONS':
      return `common.regions.${name}`;

    case 'COMMODITIES':
      return `common.commodities.${name}`;

    case 'STATUSES':
      return `common.statuses.${name}`;

    case 'PROJECT_TYPES':
      return `common.projects.${name}`;

    case 'CONTENT':
      return `common.content.${name}`;

    default:
      return name;
  }
};

const DropDown = ({ title, data, value, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();
  const handleChange = useCallback((event) => onChange(event.target.value), [onChange]);

  return (
    <FormControl className="formControl">
      <Typography className={classes.label}>{intl.formatMessage({ id: `components.dropdown.${title}` })}</Typography>
      <Select
        value={value || []}
        onChange={handleChange}
        multiple
        input={<BootstrapInput />}
      >
        {data.map((entry) => <MenuItem key={`${entry}Dropdown`} value={entry}>{intl.formatMessage({ id: getDropdownItemName(title, entry) })}</MenuItem>)}
      </Select>
    </FormControl>

  );
};

export default DropDown;

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  value: [],
};
