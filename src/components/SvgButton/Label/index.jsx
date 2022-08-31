import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    display: '-webkit-box',
    height: '3em',
    marginTop: '0.2em',
    overflow: 'hidden',
    width: '7em',
    wordWrap: 'break-word',
    // TODO: Update to use the line-clamp property when CSS Overflow Module Level 3 is available
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
}));

const Label = ({ label }) => {
  const classes = useStyles();

  return <Typography className={classes.root} variant="body1">{label}</Typography>;
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Label;
