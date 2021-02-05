import React from 'react';
import {
  useMediaQuery, Typography, Button, makeStyles, createStyles, Grid,
} from '@material-ui/core';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles(() => createStyles({
  pageButton: {
    height: 125,
    width: 330,
    margin: '0px 20px 0px 20px',
    border: '3px solid #8fb9d4',
  },
}));

const TitleContent = () => {
  const { configDispatch, config } = useConfig();
  const classes = useStyles();

  /**
   * CER template uses a custom breakpoint.
   */
  const desktop = useMediaQuery('(min-width: 992px)');

  const handleRedirect = (page) => {
    configDispatch({ type: 'page/changed', payload: page });
  };

  return (
    <>
      <header>
        <Typography variant={desktop ? 'h4' : 'h5'}>Open Corridor</Typography>
        <Typography variant={desktop ? 'h5' : 'h6'}>Lorem ipsum frontline workers isolation virtual this claim is disputed social distance. Virtual Among Us virtual happy hour COVID-19 droplet hurricane Greek alphabet the new normal. Joe Exotic into quarantine storm Area 51 Netflix protests about March 213th sweatpants isolation. N95 virtual happy hour virtual Mr. Peanut self care herd immunity Quibi hurricane Greek alphabet. Murder hornets COVID-19 schadenfreude mail-in vote. Four seasons total landscaping stimulus home school.</Typography>

      </header>
      <hr />
      <section>
        <Grid>
          <Grid item>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page1')}><Typography variant="h3">The Project</Typography></Button>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page2')}><Typography variant="h3">The Data</Typography></Button>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page3')}><Typography variant="h3">The Methods</Typography></Button>
          </Grid>
          <Grid item>
            {config.page !== 'search' && <Button onClick={() => handleRedirect('search')}><Typography variant='body1'>Back to Search</Typography></Button>}
          </Grid>
        </Grid>
      </section>
      <hr />
      <br />
    </>
  );
};

export default TitleContent;
