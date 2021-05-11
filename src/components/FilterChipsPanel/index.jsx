import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderWidth: '3px',
    padding: '1.5em',
  },
}));

const chipData = ['filter1', 'filter2', 'filter3'];

const FilterChipsPanel = () => {
  const classes = useStyles();
  const initialState = [];

  return (
    <div>
      {chipData.map((data) => (
        <Chip
          key={data}
          label={data}
        />
      ))}
    </div>
  );
};

export default FilterChipsPanel;
