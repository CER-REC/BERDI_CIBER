import React from 'react';
import PropTypes from 'prop-types';
import { Chip, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  chip: {
    background: '#E1F1DA',
    border: '1px solid black',
    borderRadius: '30px',
    margin: '1em 0.5em 0em 0.5em',
    paddingRight: '0.3em',
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    fill: 'black',
    transform: 'scale(1.15)',
  },
}));

const FilterChipsPanel = ({ initialState }) => {
  const classes = useStyles();

  const handleClick = () => () => {
    // TODO: do filter statement to remove given chip name
  };

  return (
    <>
      {initialState.map((data) => (
        <Chip
          key={data}
          label={data}
          onClick={handleClick(data)}
          onDelete={handleClick(data)}
          deleteIcon={(
            <CloseIcon
              className={classes.closeButton}
            />
          )}
          className={classes.chip}
        />
      ))}
    </>
  );
};

FilterChipsPanel.defaultProps = {
  initialState: [],
};

FilterChipsPanel.propTypes = {
  initialState: PropTypes.arrayOf(PropTypes.string),
};

export default FilterChipsPanel;
