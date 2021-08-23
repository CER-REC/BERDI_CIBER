import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

// Arcs are needed as bezier curves cannot make a perfect circle
const getDraw = (point, radius) => {
  const r = radius.toFixed(1);

  return `M ${(point.x + radius).toFixed(1)},${point.y.toFixed(1)}`
         + ` a ${r},${r} 0 0 1 -${r},${r}`
         + ` a ${r},${r} 0 0 1 -${r},-${r}`
         + ` a ${r},${r} 0 0 1 ${r},-${r}`
         + ` a ${r},${r} 0 0 1 ${r},${r}`;
};

const useStyles = makeStyles({
  root: { animation: '$grow 0.3s' },
  '@keyframes grow': {
    '0%': { transform: 'scale(0)' },
    '80%': { transform: 'scale(1.2)' },
  },
});

const Circle = ({ animation, point, radius }) => {
  const classes = useStyles();

  return (
    <path
      className={classes.root}
      transform-origin={`${point.x} ${point.y}`}
      d={getDraw(point, radius)}
    >
      {
        animation && (
          <animate
            attributeName="d"
            values={animation}
            dur="10s"
            repeatCount="indefinite"
          />
        )
      }
    </path>
  );
};

Circle.propTypes = {
  animation: PropTypes.string,
  point: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  radius: PropTypes.number.isRequired,
};

Circle.defaultProps = {
  animation: null,
};

export default Circle;
