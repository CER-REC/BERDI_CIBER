/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Popover, Icon } from '@material-ui/core';
import semiCircle from './semiCircle.svg';
import semiCircleRight from './semiCircleRight.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: 'transparent',
      //   border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
    //   boxShadow: '#ebebeb 0 2px 2px',
    //   '&:focus, &:hover, &$active': {
    //     boxShadow: '#ccc 0 2px 3px 1px',
    //   },
    },
  },
  datePicker: {
    width: '100%',
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000000',
    fontSize: 16,
    padding: '0.5em',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': { borderRadius: 5 },
  },
}));

export const RangeSlider = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setValue(newValue);
  };

  const thumb = (props) => (
    <span className={classes.thumb} {...props}>
      {console.log(props)}
      <Icon>
        <img src={props['data-index'] === 0 ? semiCircle : semiCircleRight} style={{ height: '80%', marginBottom: '35%' }} />
      </Icon>
    </span>
  );

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        // aria-labelledby="range-slider"
        ThumbComponent={thumb}
      />
    </div>
  );
};

export const MyPopover = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div
        className={classes.datePicker}
        onClick={handleClick}
      >
        Open Popover
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <RangeSlider />
      </Popover>
    </div>
  );
};

