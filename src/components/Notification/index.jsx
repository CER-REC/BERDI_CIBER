import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import info from '../../images/info.svg';

const iconSize = '2.5em';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    backgroundColor: theme.palette.content.background,
    borderRadius: 10,
    display: 'flex',
    marginTop: '1.5em',
    padding: '1.2em 1.4em',
  },
  icon: {
    alignSelf: 'center',
    backgroundColor: theme.palette.blue.navy,
    borderRadius: '50%',
    flexShrink: 0,
    height: iconSize,
    marginRight: '1em',
    padding: '0.5em',
    width: iconSize,
  },
  content: {
    alignSelf: 'center',
    color: theme.palette.blue.darkBluePurple,
  },
}));

const Notification = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.icon} src={info} alt="info icon" />
      <Typography className={classes.content} variant="body2">
        {children}
      </Typography>
    </div>
  );
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Notification;
