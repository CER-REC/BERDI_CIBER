import React, { useEffect, useRef, useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    maxHeight: '3em',
    marginTop: '0.2em',
    overflow: 'hidden',
    width: '6.8em',
  },
}));

const Label = ({ label }) => {
  const classes = useStyles();
  const ref = useRef();
  const [clip, setClip] = useState(label);
  const ellipsis = (clip.length === label.length) ? '' : '...';
  const clippedLabel = clip + ellipsis;

  useEffect(() => setClip(label), [label]);
  useEffect(() => {
    const isOverflowing = ref.current.clientHeight < ref.current.scrollHeight;

    if (isOverflowing) {
      setClip(clip.slice(0, -1));
    }
  }, [ref, clip]);

  return (
    <Typography ref={ref} classes={{ root: classes.root }} variant="body1">{clippedLabel}</Typography>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Label;
