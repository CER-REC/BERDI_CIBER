import React, { useCallback } from 'react';
import { FormControl, InputBase, MenuItem, Select, Typography, makeStyles, withStyles } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import IconCheckbox from '../IconCheckbox';

const BootstrapInput = withStyles(() => ({
  input: {
    border: '2px solid #000000',
    borderRadius: 5,
    fontSize: 16,
    padding: '0.5em',
    '&:focus': { borderRadius: 5 },
    '&.MuiSelect-select.MuiSelect-select': { paddingRight: '2em' },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& svg': {
      color: theme.palette.primary.main,
      height: '1.4em',
      marginTop: '-0.2em',
      marginRight: '0.2em',
      width: '1.4em',
    },
  },
  label: { fontWeight: 600 },
  item: {
    fontSize: 16,
    '& > .IconCheckbox': { paddingRight: '0.5em' },
    '&.Mui-selected': { backgroundColor: 'transparent' },
  },
  menu: {
    background: '#F8F8F8',
    border: '1px solid #9E9E9E',
    borderRadius: 0,
  },
}));

const DropDown = ({ title, data, value, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();
  const handleChange = useCallback((event) => onChange(event.target.value), [onChange]);
  const getDropdownItemName = useCallback((type, name) => {
    switch (type) {
      case 'REGIONS':
        return intl.formatMessage({ id: `common.regions.${name}` });
      case 'COMMODITIES':
        return intl.formatMessage({ id: `common.commodities.${name}` });
      case 'STATUSES':
        return intl.formatMessage({ id: `common.statuses.${name}` });
      case 'PROJECT_TYPES':
        return intl.formatMessage({ id: `common.projects.${name}` });
      case 'CONTENT':
        return intl.formatMessage({ id: `common.content.${name}` });
      default:
        return name;
    }
  }, [intl]);
  const renderValue = useCallback((selected) => {
    if (selected.length === data.length) {
      return intl.formatMessage({ id: 'components.dropdown.all' });
    }

    if (selected.length === 1) {
      return getDropdownItemName(title, selected[0]);
    }

    return intl.formatMessage({ id: 'components.dropdown.multiple' });
  }, [data, intl, getDropdownItemName, title]);

  return (
    <FormControl className={`FormControl ${classes.root}`}>
      <Typography classes={{ root: classes.label }}>{intl.formatMessage({ id: `components.dropdown.${title}` })}</Typography>
      <Select
        value={value || []}
        onChange={handleChange}
        multiple
        input={<BootstrapInput />}
        MenuProps={{
          classes: { paper: classes.menu },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        IconComponent={KeyboardArrowDown}
        renderValue={renderValue}
      >
        {
          data.map((entry) => (
            <MenuItem classes={{ root: classes.item }} key={entry} value={entry}>
              <IconCheckbox checked={value.indexOf(entry) !== -1} />
              {getDropdownItemName(title, entry)}
            </MenuItem>
          ))
        }
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
