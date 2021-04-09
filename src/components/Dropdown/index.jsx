import React, { useCallback } from 'react';
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { reportFilter } from '../../utilities/analytics';
import IconCheckbox from '../IconCheckbox';
import BootstrapInput from './BootstrapInput';
import DataTooltip from './DataTooltip';

const useStyles = makeStyles(() => ({
  root: { width: '100%' },
  label: { fontWeight: 600 },
  item: {
    fontSize: 16,
    '& > span': { padding: '0 0.5em 0 0' },
    '&.Mui-selected': { backgroundColor: 'transparent' },
  },
  menu: {
    background: '#F8F8F8',
    border: '1px solid #9E9E9E',
    borderRadius: 0,
  },
}));

const DropDown = ({ type, hasHelp, options, value, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();
  const handleChange = useCallback((event) => {
    const selected = event.target.value;

    // 0 is used as the value to avoid collision with any strings in the data
    if (selected[selected.length - 1] === 0) {
      if (selected.length > options.length) {
        reportFilter(type, 'ALL', false);
        onChange([]);
      } else {
        reportFilter(type, 'ALL', true);
        onChange(options);
      }

      return;
    }

    const selectedItem = (
      value.filter((item) => !selected.includes(item))[0]
      || selected.filter((item) => !value.includes(item))[0]
    );

    reportFilter(type, selectedItem, (selected.length > value.length));
    onChange(selected);
  }, [type, options, value, onChange]);
  const getDropdownItemName = useCallback((name) => {
    switch (type) {
      case 'REGIONS':
        return intl.formatMessage({ id: `common.regions.${name}` });
      case 'COMMODITIES':
        return intl.formatMessage({ id: `common.commodities.${name}` });
      case 'STATUSES':
        return intl.formatMessage({ id: `common.statuses.${name}` });
      case 'PROJECT_TYPES':
        return intl.formatMessage({ id: `common.projects.${name}` });
      case 'CONTENT_TYPES':
        return intl.formatMessage({ id: `common.content.${name}` });
      default:
        return name;
    }
  }, [type, intl]);
  const renderValue = useCallback((selected) => {
    if (selected.length === options.length) {
      return intl.formatMessage({ id: 'components.dropdown.all' });
    }

    if (selected.length === 1) {
      return getDropdownItemName(selected[0]);
    }

    return intl.formatMessage({ id: 'components.dropdown.multiple' });
  }, [options, intl, getDropdownItemName]);

  return (
    <FormControl className={`DropDown ${classes.root}`}>
      <Typography classes={{ root: classes.label }}>
        {intl.formatMessage({ id: `components.dropdown.${type}` })}
        {hasHelp && (<DataTooltip />)}
      </Typography>
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
          autoFocus: false,
          getContentAnchorEl: null,
        }}
        IconComponent={KeyboardArrowDown}
        renderValue={renderValue}
      >
        <MenuItem classes={{ root: classes.item }} value={0}>
          <Checkbox
            checked={(options.length > 0) && (value.length === options.length)}
            indeterminate={(value.length > 0) && (value.length < options.length)}
          />
          {intl.formatMessage({ id: 'components.dropdown.all' })}
        </MenuItem>
        {
          options.map((entry) => (
            <MenuItem classes={{ root: classes.item }} key={entry} value={entry}>
              <IconCheckbox checked={value.indexOf(entry) !== -1} />
              {getDropdownItemName(entry)}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

DropDown.propTypes = {
  type: PropTypes.string.isRequired,
  hasHelp: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  value: [],
};

export default DropDown;
