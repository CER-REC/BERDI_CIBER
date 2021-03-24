import React from 'react';
import { Icon, IconButton, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    height: '7em',
    padding: '0.5em',
    width: '7em',
    '&:hover': {
      boxShadow: '4px 4px 6px 0px rgba(28, 82, 4, 0.3)',
      borderColor: theme.palette.green.dark,
      borderStyle: 'solid',
      borderWidth: '1px',
    },
  },
  buttonLabel: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    width: '100%',
  },
  icon: {
    flex: 1,
    height: '100%',
    padding: '0.2em',
    width: '100%',
  },
  svg: {
    height: '100%',
    width: '100%',
  },
}));

const SvgButton = ({ src, caption, label, onClick }) => {
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
      <Typography variant="subtitle2">{caption}</Typography>
      <Typography variant="subtitle1">{label}</Typography>
    </IconButton>
  );
};

SvgButton.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SvgButton;
