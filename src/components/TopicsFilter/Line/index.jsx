import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

//      first.0   middle.0   last.0
//         |         |         |
// (point1)|-------------------|(point2)
//         |         |         |
//      first.1   middle.1   last.1
const getPerpendicularPoints = (point1, point2, distance) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const c = Math.sqrt((dx * dx) + (dy * dy));
  const xOffset = (distance * (dy / c));
  const yOffset = (distance * (dx / c));
  const midPoint = {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };

  return {
    first: [{
      x: (point1.x - xOffset).toFixed(1),
      y: (point1.y + yOffset).toFixed(1),
    }, {
      x: (point1.x + xOffset).toFixed(1),
      y: (point1.y - yOffset).toFixed(1),
    }],
    middle: [{
      x: (midPoint.x - xOffset).toFixed(1),
      y: (midPoint.y + yOffset).toFixed(1),
    }, {
      x: (midPoint.x + xOffset).toFixed(1),
      y: (midPoint.y - yOffset).toFixed(1),
    }],
    last: [{
      x: (point2.x - xOffset).toFixed(1),
      y: (point2.y + yOffset).toFixed(1),
    }, {
      x: (point2.x + xOffset).toFixed(1),
      y: (point2.y - yOffset).toFixed(1),
    }],
  };
};

//         a       e
//         |\__c__/|
// (point1)| _____ |(point2)
//         |/  f  \|
//         b       d
const getDraw = (point1, point2, width) => {
  const points = getPerpendicularPoints(point1, point2, width);
  const a = points.first[0];
  const b = points.first[1];
  const c = points.middle[0];
  const d = points.last[1];
  const e = points.last[0];
  const f = points.middle[1];

  return `M ${a.x},${a.y}`
         + ` L ${b.x},${b.y}`
         + ` C ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`
         + ` L ${e.x},${e.y}`
         + ` C ${e.x},${e.y} ${f.x},${f.y} ${a.x},${a.y}`;
};

const useStyles = makeStyles({
  root: { animation: '$grow 0.3s' },
  '@keyframes grow': {
    from: { transform: 'scale(0)' },
  },
});

const Line = ({ point1, point2, width }) => {
  const classes = useStyles();

  return (
    <path
      className={classes.root}
      transform-origin={`${point1.x} ${point1.y}`}
      d={getDraw(point1, point2, width)}
    />
  );
};

Line.propTypes = {
  point1: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  point2: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
};

export default Line;
