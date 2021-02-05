import React from 'react';
import {
  useMediaQuery, Typography, Button, makeStyles, createStyles, Grid,
} from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  searchBox: {
    height: '20vh',
    backgroundColor: '#63b440',
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h2'> Search the Data</Typography>
      <article className={classes.searchBox}>
        <Typography variant='h6' style={{ marginLeft: '10px' }}>Try custom keywords</Typography>
        <input style={{ marginLeft: '10px' }} />
      </article>
    </>
  );
};

export default Search;
