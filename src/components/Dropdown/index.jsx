import React, { useCallback } from 'react';
import {
  Checkbox,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import IconCheckbox from '../IconCheckbox';
import DataTooltip from './DataTooltip';

const BootstrapInput = withStyles((theme) => ({
  root: {
    '& svg': {
      color: theme.palette.primary.main,
      height: '1.4em',
      marginTop: '-0.2em',
      marginRight: '0.2em',
      width: '1.4em',
    },
  },
  input: {
    border: '2px solid #000000',
    borderRadius: 5,
    fontSize: 16,
    padding: '0.5em',
    '&:focus': { borderRadius: 5 },
    '&.MuiSelect-select.MuiSelect-select': { paddingRight: '2em' },
  },
}))(InputBase);

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

const DropDown = ({ title, hasHelp, data, value, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();
  const handleChange = useCallback((event) => {
    const selected = event.target.value;

    // 0 is used as the value to avoid collision with any strings in the data
    if (selected[selected.length - 1] === 0) {
      if (selected.length > data.length) {
        onChange([]);
      } else {
        onChange(data);
      }

      return;
    }

    onChange(selected);
  }, [data, onChange]);
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
      <Typography classes={{ root: classes.label }}>
        {intl.formatMessage({ id: `components.dropdown.${title}` })}
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
          getContentAnchorEl: null,
        }}
        IconComponent={KeyboardArrowDown}
        renderValue={renderValue}
      >
        <MenuItem classes={{ root: classes.item }} value={0}>
          <Checkbox
            checked={(data.length > 0) && (value.length === data.length)}
            indeterminate={(value.length > 0) && (value.length < data.length)}
          />
          {intl.formatMessage({ id: 'components.dropdown.all' })}
        </MenuItem>
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
  hasHelp: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  value: [],
};
