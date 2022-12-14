import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    '& :before': { transform: 'translate(-0.5em)' },
  },
}));

const Alert = ({ className, title, body, link, onClick }) => {
  const classes = useStyles();

  return (
    <div className={`Alert alert ${classes.root} ${className}`}>
      <span style={{ marginLeft: '1.5em' }}>
        <strong>{title}</strong>
        &nbsp;-&nbsp;
        {body}
        &nbsp;
        {link && (
          <Button
            color="inherit"
            onClick={onClick}
            disableRipple
          >
            {link}
          </Button>
        )}
      </span>
    </div>
  );
};

Alert.defaultProps = {
  link: '',
  onClick: () => {},
};

Alert.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default Alert;
