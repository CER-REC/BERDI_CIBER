import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import info from '../../images/info.svg';

const iconSize = '2.5em';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    backgroundColor: theme.palette.content.background,
    borderRadius: 10,
    display: 'flex',
    fontSize: '1rem',
    padding: '1.2em 1.4em',
  },
  icon: {
    alignSelf: 'center',
    backgroundColor: theme.palette.teal.blue,
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

const Notification = ({ className, children }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={`${classes.root} ${className}`}>
      <img className={classes.icon} src={info} alt={intl.formatMessage({ id: 'components.notification.iconAltText' })} />
      <Typography className={classes.content} component="div" variant="body2">
        {children}
      </Typography>
    </div>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Notification.defaultProps = {
  className: '',
};

export default Notification;
