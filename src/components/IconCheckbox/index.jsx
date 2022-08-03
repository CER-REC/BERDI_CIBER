import React, { useMemo } from 'react';
import { Checkbox, Icon, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import checkedIcon from '../../images/checkedIcon.png';
import uncheckedIcon from '../../images/uncheckedIcon.png';
import { useIntl } from 'react-intl';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    '& img': { verticalAlign: 'top' },
  },
}));

const IconCheckbox = ({ checked }) => {
  const classes = useStyles();
  const intl = useIntl();
  const icon = useMemo(() => (
    <Icon>
      <img
        src={uncheckedIcon}
        alt={intl.formatMessage({ id: 'components.iconCheckbox.uncheckedAltText' })}
      />
    </Icon>
  ), []);
  const iconChecked = useMemo(() => (
    <Icon>
      <img
        src={checkedIcon}
        alt={intl.formatMessage({ id: 'components.iconCheckbox.checkedAltText' })}
      />
    </Icon>
  ), []);

  return (
    <Checkbox
      className={`IconCheckbox ${classes.root}`}
      icon={icon}
      checkedIcon={iconChecked}
      checked={checked}
      disabled
    />
  );
};

IconCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default IconCheckbox;
