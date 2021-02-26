import { Button, createStyles, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();

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
        <Typography variant={desktop ? 'h4' : 'h5'}>{intl.formatMessage({ id: 'common.title' })}</Typography>
        <Typography variant={desktop ? 'h5' : 'h6'}>{intl.formatMessage({ id: 'common.description' })}</Typography>

      </header>
      <hr />
      <section>
        <Grid>
          <Grid item>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page1')}>
              <div>
                <Typography variant="h3">{intl.formatMessage({ id: 'navigation.page1.title' })}</Typography>
                {config.page === 'search' && <Typography variant="body1">{intl.formatMessage({ id: 'navigation.page1.description' })}</Typography>}
              </div>
            </Button>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page2')}>
              <div>
                <Typography variant="h3">{intl.formatMessage({ id: 'navigation.page2.title' })}</Typography>
                {config.page === 'search' && <Typography variant="body1">{intl.formatMessage({ id: 'navigation.page2.description' })}</Typography>}
              </div>
            </Button>
            <Button className={classes.pageButton} variant="outlined" onClick={() => handleRedirect('page3')}>
              <div>
                <Typography variant="h3">{intl.formatMessage({ id: 'navigation.page3.title' })}</Typography>
                {config.page === 'search' && <Typography variant="body1">{intl.formatMessage({ id: 'navigation.page3.description' })}</Typography>}
              </div>
            </Button>
          </Grid>
          <Grid item>
            {config.page !== 'search' && <Button onClick={() => handleRedirect('search')}><Typography variant="body1">{intl.formatMessage({ id: 'navigation.back' })}</Typography></Button>}
          </Grid>
        </Grid>
      </section>
      <hr />
      <br />
    </>
  );
};

export default TitleContent;
