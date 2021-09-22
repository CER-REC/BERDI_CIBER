import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    border: 'none',
    borderRadius: 10,
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
  title: {
    color: theme.palette.blue.dark,
    display: 'inline-block',
    textDecoration: 'underline',
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
