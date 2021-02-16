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
    textAlign: 'left',

    '& h3': {
      color: '#284162',
      textDecoration: 'underline',
    },
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
        <Typography variant={desktop ? 'h5' : 'h6'}>Search over 20,000 tables extracted from 37 pipeline applications and their Environmental and Socio-Econonmic Assesments - the start of something new, at the Canada Energy Regulator.</Typography>

      </header>
      <hr />
      <section>
        <Grid justify="space-evenly">
          <Grid item>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page1')}>
              <div>
                <Typography variant="h3">The Project</Typography>
                {config.page === 'search' && <Typography variant="body1">The opportunity of a legacy, driven by policy - and our plans for the future.</Typography>}
              </div>
            </Button>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page2')}>
              <div>
                <Typography variant="h3">The Data</Typography>
                {config.page === 'search' && <Typography variant="body1">An introduction to Environmental and Socio-Economic Assessments(&quot;ESA&quot;s).</Typography>}
              </div>
            </Button>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page3')}>
              <div>
                <Typography variant="h3">The Methods</Typography>
                {config.page === 'search' && <Typography variant="body1">Learn how we turned regulatory documents into structured data.</Typography>}
              </div>
            </Button>
          </Grid>
          <Grid item>
            {config.page !== 'search' && <Button onClick={() => handleRedirect('search')}><Typography variant="body1">Back to Search</Typography></Button>}
          </Grid>
        </Grid>
      </section>
      <hr />
      <br />
    </>
  );
};

export default TitleContent;
