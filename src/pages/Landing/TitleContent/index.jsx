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
              title={intl.formatMessage({ id: 'pages.project.title' })}
              body={intl.formatMessage({ id: 'pages.project.description' })}
              onClick={createHandleClick('project')}
            />
          </Grid>
          <Grid item xs={4}>
            <ContentButton
              title={intl.formatMessage({ id: 'pages.data.title' })}
              body={intl.formatMessage({ id: 'pages.data.description' })}
              onClick={createHandleClick('data')}
            />
          </Grid>
          <Grid item xs={4}>
            <ContentButton
              title={intl.formatMessage({ id: 'pages.methods.title' })}
              body={intl.formatMessage({ id: 'pages.methods.description' })}
              onClick={createHandleClick('methods')}
            />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default TitleContent;
