import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Label from './Label';
import Rating from './Rating';
import Topic from './Topic';

const pulseMS = 1500;
const delayMS = 500;
const maxWaitMS = 8000;
const circleWidth = '3.5em';

const setRandomPulse = (node, pulseClass, setTimeoutId) => {
  const timeout = pulseMS + delayMS + (Math.random() * maxWaitMS);

  const id = setTimeout(() => {
    if (document.body.contains(node)) {
      node.classList.add(pulseClass);
      setTimeout(() => node.classList.remove(pulseClass), pulseMS);
      setRandomPulse(node, pulseClass, setTimeoutId);
    }
  }, timeout);

  setTimeoutId(id);
};

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
    height: circleWidth,
    margin: 'auto',
    padding: '0.4em',
    width: circleWidth,
  },
  pulse: {
    '&:before': {
      animation: `$pulse ${pulseMS}ms`,
      borderRadius: '50%',
      content: '""',
      height: circleWidth,
      left: 0,
      margin: 'auto',
      position: 'absolute',
      right: 0,
      top: 0,
      width: circleWidth,
    },
  },
  svg: { height: 'calc(100% - 0.4em)' },
  '@keyframes pulse': {
    from: {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.25)',
    },
    to: {
      transform: 'scale(1)',
      boxShadow: '0 0 0 1em rgba(0, 0, 0, 0)',
    },
  },
});

const SvgButton = ({
  iconRef,
  src,
  label,
  title,
  description,
  score,
  type,
  disabled,
  isPulsing,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const classes = useStyles();
  const [timeoutId, setTimeoutId] = useState();

  useEffect(() => {
    if (!isPulsing) {
      clearTimeout(timeoutId);

      return;
    }

    setRandomPulse(iconRef.current, classes.pulse, setTimeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPulsing, iconRef, classes]);

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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={disabled}
          disableRipple
        >
          <Icon ref={iconRef} classes={{ root: classes.icon }}>
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
  iconRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isPulsing: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

SvgButton.defaultProps = {
  disabled: false,
  isPulsing: false,
};

export default SvgButton;
