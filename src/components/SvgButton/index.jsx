import React from 'react';
import { Icon, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Label from './Label';
import Rating from './Rating';
import Topic from './Topic';

const useStyles = makeStyles({
  root: { display: 'inline-block' },
  // Tooltip popup positioning is based on the tooltip wrapper's size
  tooltip: { maxWidth: 'none' },
  button: {
    padding: 0,
    '&:hover': { backgroundColor: 'transparent' },
  },
  buttonLabel: { display: 'block' },
  disabled: { opacity: 0.2 },
  icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    boxShadow: '2px 4px 9px rgba(0, 0, 0, 0.25)',
    display: 'block',
    height: '3.5em',
    margin: 'auto',
    padding: '0.4em',
    width: '3.5em',
  },
  svg: { height: 'calc(100% - 0.4em)' },
});

const SvgButton = ({
  src,
  label,
  title,
  description,
  score,
  type,
  disabled,
  onClick,
}) => {
  const classes = useStyles();

  return (
    // Need to wrap the button in another element
    // because a disabled button doesn't fire the events to trigger the tooltip
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={<Topic title={title} description={description} score={score} type={type} />}
      placement="right"
    >
      <div className={classes.root}>
        <IconButton
          classes={{ root: classes.button, label: classes.buttonLabel, disabled: classes.disabled }}
          onClick={onClick}
          disabled={disabled}
          disableRipple
        >
          <Icon classes={{ root: classes.icon }}>
            <img className={classes.svg} src={src} alt={label} />
            <Rating score={score} type={type} />
          </Icon>
          <Label label={label} />
        </IconButton>
      </div>
    </Tooltip>
  );
};

SvgButton.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SvgButton.defaultProps = {
  disabled: false,
};

export default SvgButton;
