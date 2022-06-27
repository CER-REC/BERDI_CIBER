import { Icon, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import DotsRating from '../DotsRating';
import Label from './Label';
import Topic from './Topic';
import info from '../../images/info.svg';

const pulseMS = 1500;
const circleWidth = '3.5em';
const notificationWidth = '1.2em';

const useStyles = makeStyles((theme) => ({
  root: { display: 'inline-block' },
  // Tooltip popup positioning is based on the tooltip wrapper's size
  tooltip: { maxWidth: 'none' },
  button: {
    padding: 0,
    '&.Mui-focusVisible .MuiIcon-root': { backgroundColor: theme.palette.action.hover },
    '&:hover': {
      backgroundColor: 'transparent',
      '& .MuiIcon-root': { backgroundColor: theme.palette.action.hover },
    },
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
    overflow: 'visible',
    padding: '0.4em',
    width: circleWidth,
    '&> div': { position: 'relative' },
  },
  notification: {
    backgroundColor: theme.palette.icon.grey,
    backgroundImage: `url(${info})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 50%',
    borderRadius: '50%',
    height: notificationWidth,
    position: 'absolute',
    right: `calc(${notificationWidth} / -2)`,
    top: `calc(${notificationWidth} / -2)`,
    width: notificationWidth,
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
  svg: { width: 'calc(100% - 0.4em)' },
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
}));

const SvgButton = ({
  iconRef,
  src,
  label,
  title,
  description,
  notification,
  score,
  type,
  disabled,
  pulse,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const classes = useStyles();

  return (
    // Need to wrap the button in another element
    // because a disabled button doesn't fire the events to trigger the tooltip
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={(
        <Topic
          title={title}
          description={description}
          notification={disabled ? null : notification}
          score={score}
          type={type}
        />
      )}
      enterDelay={500}
      enterNextDelay={500}
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
          <Icon
            ref={iconRef}
            className={pulse ? classes.pulse : null}
            classes={{ root: classes.icon }}
          >
            <div>
              <img className={classes.svg} src={src} alt={label} />
              {!disabled && notification && <div className={classes.notification} />}
            </div>
            <DotsRating score={score} type={type} />
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
  notification: PropTypes.string,
  score: PropTypes.number,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  pulse: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

SvgButton.defaultProps = {
  notification: null,
  score: null,
  disabled: false,
  pulse: false,
};

export default SvgButton;
