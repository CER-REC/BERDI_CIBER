import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import magnifyingGlass from '../../images/listPanel/magnifyingGlass.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: 16,
    height: '6em',
    margin: 0,
    width: '100%',
    padding: '0.5em 1em',
    '&.Mui-focusVisible::after': {
      content: '""',
      background: theme.palette.action.focus,
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
  },
  label: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '100%',
  },
}));

const ThumbnailButton = ({ className, src, onClick, ariaText }) => {
  const classes = useStyles();

  return (
    <Button
      aria-label={ariaText}
      className={className}
      classes={{ root: classes.root, label: classes.label }}
      style={{ backgroundImage: `url(${src})` }}
      onClick={onClick}
      disableRipple
    >
      <img alt="" src={magnifyingGlass} />
    </Button>
  );
};

ThumbnailButton.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaText: PropTypes.string.isRequired,
};

ThumbnailButton.defaultProps = {
  className: null,
};

export default ThumbnailButton;
