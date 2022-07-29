import { Grid, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import { reportSection } from '../../../utilities/analytics';
import ContentButton from '../../ContentButton';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '2.5em',
  },
  divider: {
    backgroundColor: theme.palette.blue.navy,
    height: '4px',
    marginTop: '0.5em',
  },
  subtitle: { fontSize: 20 },
}));

const FullButtons = () => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const handleClick = useCallback((page) => {
    reportSection(page);
    configDispatch({ type: 'page/changed', payload: page });
  }, [configDispatch]);
  const createHandleClick = useCallback((page) => (() => handleClick(page)), [handleClick]);

  return (
    <div className={`TitleContent ${classes.root} `}>
      <hr className={classes.divider} />
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

export default FullButtons;
