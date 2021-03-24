import React, { useCallback } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import ContentButton from '../../../components/ContentButton';
import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '2.5em',
    '& hr': {
      borderColor: theme.palette.primary.main,
    },
  },
  subtitle: { fontSize: 20 },
}));

const TitleContent = () => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();
  const handleClick = useCallback(
    (page) => configDispatch({ type: 'page/changed', payload: page }),
    [configDispatch],
  );
  const createHandleClick = useCallback((page) => (() => handleClick(page)), [handleClick]);

  return (
    <div className={`TitleContent ${classes.root} `}>
      <header>
        <Typography variant="h4" gutterBottom>{intl.formatMessage({ id: 'common.title' })}</Typography>
        <Typography classes={{ root: classes.subtitle }} variant="h5">{intl.formatMessage({ id: 'common.description' })}</Typography>
      </header>
      <hr />
      <section>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <ContentButton
              title={intl.formatMessage({ id: 'navigation.page1.title' })}
              body={intl.formatMessage({ id: 'navigation.page1.description' })}
              onClick={createHandleClick('page1')}
            />
          </Grid>
          <Grid item xs={4}>
            <ContentButton
              title={intl.formatMessage({ id: 'navigation.page2.title' })}
              body={intl.formatMessage({ id: 'navigation.page2.description' })}
              onClick={createHandleClick('page2')}
            />
          </Grid>
          <Grid item xs={4}>
            <ContentButton
              title={intl.formatMessage({ id: 'navigation.page3.title' })}
              body={intl.formatMessage({ id: 'navigation.page3.description' })}
              onClick={createHandleClick('page3')}
            />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default TitleContent;
