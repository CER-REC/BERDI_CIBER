import React, { useCallback } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useAPI from '../../hooks/useAPI';
import { reportFilter } from '../../utilities/analytics';
import IconCheckbox from '../IconCheckbox';
import BootstrapInput from './BootstrapInput';
import DataTooltip from './DataTooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: theme.palette.teal.blue,
  },
  label: { fontWeight: 600 },
  item: {
    fontSize: 16,
    '& > span': { padding: '0 0.5em 0 0' },
    '&.Mui-selected': { backgroundColor: 'transparent' },
    color: theme.palette.teal.blue,
  },
  menu: {
    background: '#F8F8F8',
    border: `1px solid ${theme.palette.teal.blue}`,
    borderRadius: 0,
  },
}));

const DropDown = ({ type, hasHelp, options, value, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { applicationIdLabels } = useAPI();
  const handleChange = useCallback((event) => {
    const selected = event.target.value;

    const selectedItem = (
      value.filter((item) => !selected.includes(item))[0]
      || selected.filter((item) => !value.includes(item))[0]
    );

    reportFilter(type, selectedItem, (selected.length > value.length));
    onChange(selected);
  }, [type, value, onChange]);

  const getDropdownItemName = useCallback((name) => {
    switch (type) {
      case 'APPLICATION_NAMES':
        return applicationIdLabels[name];
      case 'REGIONS':
        return intl.formatMessage({ id: `api.regions.${name}` });
      case 'COMMODITIES':
        return intl.formatMessage({ id: `api.commodities.${name}` });
      case 'STATUSES':
        return intl.formatMessage({ id: `api.statuses.${name}` });
      case 'PROJECT_TYPES':
        return intl.formatMessage({ id: `api.projects.${name}` });
      case 'CONTENT_TYPES':
        return intl.formatMessage({ id: `api.content.${name}` });
      case 'resultCount':
        return intl.formatMessage({ id: 'components.dropdown.resultsCountLabel' }, { num: name });
      default:
        return name;
    }
  }, [type, applicationIdLabels, intl]);
  const renderValue = useCallback((selected) => {
    if (selected.length === 0) {
      return intl.formatMessage({ id: 'components.dropdown.select' });
    }
    if (selected.length === 1) {
      return getDropdownItemName(selected[0]);
    }

    return intl.formatMessage({ id: 'components.dropdown.multiple' });
  }, [intl, getDropdownItemName]);

  const getHeaderLabel = () => {
    switch (type) {
      case 'APPLICATION_NAMES':
        return intl.formatMessage({ id: 'common.project' });
      case 'resultCount':
        // No header for result count dropdown
        return '';
      default:
        return intl.formatMessage({ id: `components.dropdown.${type}` });
    }
  };

  return (
    <FormControl className={`DropDown ${classes.root}`}>
      <Typography classes={{ root: classes.label }}>
        {getHeaderLabel()}
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
        displayEmpty
      >
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
