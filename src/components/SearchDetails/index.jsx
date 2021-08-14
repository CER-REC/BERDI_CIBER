import React from 'react';
import { Grid } from '@material-ui/core';

import FilterToggle from './FilterToggle';

// TODO: Refactor search result overview from TreeMapPanel into this component
const SearchDetails = () => (
  <Grid container style={{ padding: '2em 0' }}>
    <FilterToggle />
  </Grid>
);

export default SearchDetails;
