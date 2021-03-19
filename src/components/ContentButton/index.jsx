import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  buttonLabel: {
    textAlign: 'left',
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
    color: '#284162',
    display: 'inline-block',
  },
}));

const ContentButton = ({ title, body, onClick }) => {
  const classes = useStyles();

  return (
    <Button className="PageButton" classes={{ label: classes.buttonLabel }} variant="outlined" onClick={onClick}>
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
