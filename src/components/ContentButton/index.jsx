import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    border: '2px solid #26374A',
    borderRadius: 10,
    boxShadow: '0px -4px 0px 0px #26374A inset',
    height: '100%',
    padding: '1.5em',
    '&:hover': {
      backgroundColor: '#EDF1F4',
    },
  },
  buttonLabel: {
    display: 'block',
    flexFlow: 'column',
    height: '100%',
    textAlign: 'left',
    textTransform: 'none',
    '&> div': {
      paddingBottom: '1em',
      width: '100%',
    },
  },
  arrow: {
    border: 'solid black',
    borderWidth: '0 0.2em 0.2em 0',
    display: 'inline-block',
    float: 'right',
    height: '1em',
    padding: '0.2em',
    transform: 'rotate(-45deg) translateX(-0.8em)',
    width: '1em',
  },
  title: {
    color: theme.palette.blue.dark,
    display: 'inline-block',
  },
}));

const ContentButton = ({ title, body, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      className="PageButton"
      classes={{ outlined: classes.button, label: classes.buttonLabel }}
      variant="outlined"
      onClick={onClick}
    >
      <div>
        <Typography classes={{ root: classes.title }} variant="h6">{title}</Typography>
        <span className={classes.arrow} />
      </div>
      <Typography variant="body1">{body}</Typography>
    </Button>
  );
};

ContentButton.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContentButton;
