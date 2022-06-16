import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const environmentalColor2 = '#AC92BF';
const environmentalColor1 = '#E3DBEA';
const socioEconomicColor2 = '#ED92AD';
const socioEconomicColor1 = '#F9DBE4';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '0.5em',
    lineHeight: 0,
  },
  circle: {
    borderRadius: '50%',
    display: 'inline-block',
    height: '0.5em',
    margin: '0 0.05em',
    width: '0.5em',
    '&.environmental': {
      backgroundColor: theme.palette.environmental,
      '&:first-child:nth-last-child(2)': { backgroundColor: environmentalColor2 },
      '&:last-child:nth-child(2)': { backgroundColor: environmentalColor2 },
      '&:only-child': { backgroundColor: environmentalColor1 },
    },
    '&.socioEconomic': {
      backgroundColor: theme.palette.socioEconomic,
      '&:first-child:nth-last-child(2)': { backgroundColor: socioEconomicColor2 },
      '&:last-child:nth-child(2)': { backgroundColor: socioEconomicColor2 },
      '&:only-child': { backgroundColor: socioEconomicColor1 },
    },
  },
}));

const DotsRating = ({ score, type }) => {
  const classes = useStyles();
  const keys = score ? [...Array(score).keys()] : [];

  return (
    <div className={`DotsRating ${classes.root}`}>
      { keys.map((key) => <div key={key} className={`${classes.circle} ${type}`} />) }
    </div>
  );
};

DotsRating.propTypes = {
  score: PropTypes.number,
  type: PropTypes.string.isRequired,
};

DotsRating.defaultProps = {
  score: null,
};

export default DotsRating;
