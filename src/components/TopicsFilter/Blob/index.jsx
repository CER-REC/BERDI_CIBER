import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { ENV_SOCIO_GRADIENT_ID } from '../../../constants';
import Circle from '../Circle';
import Line from '../Line';

const maxPointOffset = 0.2;
const circleSize = 1.4;
const lineWidth = 0.5;
const getNodeId = (node) => node?.querySelector('img').alt;
const getRandomOffset = (maxOffset) => ((Math.random() * (maxOffset * 2)) - maxOffset);

const getPoint = (node, layerNode) => {
  const radius = node.offsetWidth / 2;
  const maxOffset = radius * maxPointOffset;
  let currentNode = node;
  let x = radius + getRandomOffset(maxOffset);
  let y = radius + getRandomOffset(maxOffset);

  while (currentNode !== layerNode) {
    x += currentNode.offsetLeft;
    y += currentNode.offsetTop;
    currentNode = currentNode.offsetParent;
  }

  return { x, y };
};

//    _b_
//   /   \
// a|     |c
//   \_d_/
const getDistortedCircleDraw = (point, radius, offset) => {
  const maxOffset = radius * offset;
  const bOffset = {
    x: getRandomOffset(maxOffset),
    y: getRandomOffset(maxOffset),
  };
  const cOffset = {
    x: getRandomOffset(maxOffset),
    y: getRandomOffset(maxOffset),
  };
  const dOffset = {
    x: getRandomOffset(maxOffset),
    y: getRandomOffset(maxOffset),
  };
  const a = {
    x: (point.x - radius + getRandomOffset(maxOffset)).toFixed(1),
    y: (point.y + getRandomOffset(maxOffset)).toFixed(1),
  };
  const aToB = {
    x: (radius + bOffset.x).toFixed(1),
    y: (-radius + bOffset.y).toFixed(1),
  };
  const bToC = {
    x: (radius + cOffset.x).toFixed(1),
    y: (radius + cOffset.y).toFixed(1),
  };
  const cToD = {
    x: (-radius + dOffset.x).toFixed(1),
    y: (radius + dOffset.y).toFixed(1),
  };
  const dToA = {
    x: (-radius - bOffset.x - cOffset.x - dOffset.x).toFixed(1),
    y: (-radius - bOffset.y - cOffset.y - dOffset.y).toFixed(1),
  };

  return `M ${a.x},${a.y}`
         + ` c 0,${aToB.y} ${aToB.x},${aToB.y} ${aToB.x},${aToB.y}`
         + ` c 0,0 ${bToC.x},0 ${bToC.x},${bToC.y}`
         + ` c 0,${cToD.y} ${cToD.x},${cToD.y} ${cToD.x},${cToD.y}`
         + ` c 0,0 ${dToA.x},0 ${dToA.x},${dToA.y}`;
};

const getProps = (oldProps, pointNodes, layerNode) => {
  const props = {};

  pointNodes.forEach((node) => {
    const id = getNodeId(node);
    const radius = (node.offsetWidth / 2) * circleSize;

    props[id] = oldProps[id];

    if (props[id]) {
      return;
    }

    const point = getPoint(node, layerNode);
    const animation = `${getDistortedCircleDraw(point, radius, 0)};`
                      + `${getDistortedCircleDraw(point, radius, maxPointOffset)};`
                      + `${getDistortedCircleDraw(point, radius, maxPointOffset)};`
                      + `${getDistortedCircleDraw(point, radius, maxPointOffset)};`
                      + `${getDistortedCircleDraw(point, radius, 0)};`;

    props[id] = { point, radius, animation };
  });

  return props;
};

const getCircles = (nodeIdProps, hoverId) => {
  const ids = Object.keys(nodeIdProps);

  return ids.map((id) => {
    const { point, radius } = nodeIdProps[id];
    const animation = (id !== hoverId) ? nodeIdProps[id].animation : null;

    return <Circle key={id} animation={animation} point={point} radius={radius} />;
  });
};

const getLines = (nodeIdProps) => {
  const ids = Object.keys(nodeIdProps);

  return ids.slice(1).map((id, index) => {
    const { point, radius } = nodeIdProps[id];
    const previousId = ids[index];
    const previousPoint = nodeIdProps[previousId].point;
    const width = radius * lineWidth;

    return <Line key={`${previousId}-${id}`} point1={previousPoint} point2={point} width={width} />;
  });
};

const useStyles = makeStyles({
  root: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0,
  },
});

const Blob = ({ hoverNode, layerNode, pointNodes }) => {
  // Storing property values so the randomness gets preserved through renders
  const [nodeIdProps, setNodeIdProps] = useState({});
  const classes = useStyles();
  const updateNodeIdProps = useCallback((oldProps) => {
    const newProps = getProps(oldProps, pointNodes, layerNode);

    setNodeIdProps(newProps);
  }, [pointNodes, layerNode]);

  useEffect(() => {
    const resize = () => updateNodeIdProps({});

    window.addEventListener('resize', resize);
    updateNodeIdProps(nodeIdProps);

    return () => window.removeEventListener('resize', resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateNodeIdProps]);

  if (!layerNode || !pointNodes.length) {
    return null;
  }

  return (
    <svg
      className={classes.root}
      viewBox={`0 0 ${layerNode.offsetWidth} ${layerNode.offsetHeight}`}
      fill={`url(#${ENV_SOCIO_GRADIENT_ID})`}
    >
      { getCircles(nodeIdProps, getNodeId(hoverNode)) }
      { getLines(nodeIdProps) }
    </svg>
  );
};

Blob.propTypes = {
  hoverNode: PropTypes.instanceOf(Element),
  layerNode: PropTypes.instanceOf(Element),
  pointNodes: PropTypes.arrayOf(PropTypes.instanceOf(Element)).isRequired,
};

Blob.defaultProps = {
  hoverNode: null,
  layerNode: null,
};

export default Blob;
