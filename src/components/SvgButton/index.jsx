import React from 'react';
import { Icon, IconButton, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
    height: '7em',
    width: '7em',
    '&:hover': {
      boxShadow: '4px 4px 6px 0px rgba(28, 82, 4, 0.3)',
      border: '1px solid #1C5204',
    },
  },
  buttonLabel: { display: 'block' },
  icon: {
    display: 'block',
    height: '3em',
    margin: 'auto',
    width: '3em',
  },
  svg: {
    height: '100%',
    width: '100%',
  },
}));

const SvgButton = ({ src, label, onClick }) => {
  const classes = useStyles();

  return (
    <IconButton className="SvgButton" classes={{ root: classes.root, label: classes.buttonLabel }} onClick={onClick}>
      <Icon classes={{ root: classes.icon }}>
        <img
          className={classes.svg}
          src={src}
          alt={label}
        />
      </Icon>
      <Typography variant="subtitle1">{label}</Typography>
    </IconButton>
  );
};

SvgButton.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SvgButton;
