import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import { reportPageView, reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
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

const SmallButtons = () => {
  const classes = useStyles();
  const { config, configDispatch } = useConfig();
  const intl = useIntl();

  const handleClick = useCallback((page) => {
    reportSection(page);
    configDispatch({ type: 'page/changed', payload: page });
    reportPageView(page);
  }, [configDispatch]);
  const createHandleClick = useCallback((page) => (() => handleClick(page)), [handleClick]);

  return (
    <Grid container direction="column">
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

export default SmallButtons;
