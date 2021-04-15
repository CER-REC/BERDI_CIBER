import { Button, ButtonBase, Grid, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  returnLink: {
    textDecoration: 'underline',
    fontWeight: '900',
    color: theme.palette.button.blue,
    marginBottom: '1em',
  },
  selectedButton: {
    color: 'white',
    backgroundColor: theme.palette.button.blue,
  },
  buttonSection: {
    marginBottom: '1em',
    '& button': {
      border: '3px solid rgba(5, 65, 105, 0.33)',
      borderRadius: '10px',
      textTransform: 'none',
      fontWeight: '900',
      fontSize: '15px',
      justifyContent: 'left',
      paddingLeft: '15px',
      width: '80%',
      '&:hover': {
        backgroundColor: theme.palette.button.blue,
        color: 'white',
      },
    },
    '& div': {
      flex: 'auto',
    },
  },
}));

export const BackButton = () => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const handleClick = useCallback(() => {
    reportSection('landing');
    configDispatch({ type: 'page/changed', payload: 'landing' });
  }, [configDispatch]);
  const createHandleClick = useCallback(() => (() => handleClick()), [handleClick]);

  return (
    <ButtonBase onClick={createHandleClick()} className={classes.returnLink}>
      {`> ${intl.formatMessage({ id: 'pages.back' }, { toolName: intl.formatMessage({ id: 'common.toolName' }) })}`}
    </ButtonBase>
  );
};

export default () => {
  const classes = useStyles();
  const { config, configDispatch } = useConfig();
  const intl = useIntl();

  const handleClick = useCallback((page) => {
    reportSection(page);
    configDispatch({ type: 'page/changed', payload: page });
  }, [configDispatch]);
  const createHandleClick = useCallback((page) => (() => handleClick(page)), [handleClick]);

  return (
    <Grid container direction="column">
      <Grid item>
        <ButtonBase onClick={createHandleClick('landing')} className={classes.returnLink}>
          {`> ${intl.formatMessage({ id: 'pages.back' }, { toolName: intl.formatMessage({ id: 'common.toolName' }) })}`}
        </ButtonBase>
      </Grid>

      <Grid item spacing={2} container className={classes.buttonSection}>

        <Grid item>
          <Button onClick={createHandleClick('project')} className={config.page === 'project' ? classes.selectedButton : ''}>
            {intl.formatMessage({ id: 'pages.project.title' })}
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={createHandleClick('data')} className={config.page === 'data' ? classes.selectedButton : ''}>
            {intl.formatMessage({ id: 'pages.data.title' })}
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={createHandleClick('methods')} className={config.page === 'methods' ? classes.selectedButton : ''}>
            {intl.formatMessage({ id: 'pages.methods.title' })}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
