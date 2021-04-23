/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Popover, Icon } from '@material-ui/core';
import semiCircleLeft from './semiCircleLeft.svg';
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
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setValue(newValue);
  };

  const thumb = (props) => (
    <span className={classes.thumb} {...props}>
      <Icon>
        <img src={props['data-index'] === 0 ? semiCircleLeft : semiCircleRight} style={{ height: '80%', marginBottom: '35%' }} />
      </Icon>
    </span>
  );

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        ThumbComponent={thumb}
      />
    </div>
  );
};
