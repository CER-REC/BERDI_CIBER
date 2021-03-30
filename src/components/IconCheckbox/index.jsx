import React, { useMemo } from 'react';
import { Checkbox, Icon, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import checkedIcon from '../../images/checkedIcon.png';
import uncheckedIcon from '../../images/uncheckedIcon.png';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    '& img': { verticalAlign: 'top' },
  },
}));

const IconCheckbox = ({ checked }) => {
  const classes = useStyles();
  const icon = useMemo(() => (
    <Icon>
      <img
        src={uncheckedIcon}
        alt="Unchecked icon"
      />
    </Icon>
  ), []);
  const iconChecked = useMemo(() => (
    <Icon>
      <img
        src={checkedIcon}
        alt="Checked icon"
      />
    </Icon>
  ), []);

  return (
    <Checkbox
      className={`IconCheckbox ${classes.root}`}
      icon={icon}
      checkedIcon={iconChecked}
      checked={checked}
    />
  );
};

IconCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default IconCheckbox;
