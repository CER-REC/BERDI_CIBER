import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  selectText: {
    fontSize: 20,
    lineHeight: 'normal',
    padding: '0.8em 0 0.5em 0.3em',
    fontWeight: 'lighter',
  },
}));

const SelectHelpText = ({ text }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.selectText}>
      {text}
    </Typography>
  );
};

SelectHelpText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SelectHelpText;
