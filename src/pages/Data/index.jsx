import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import BackButton from '../../components/BackButton';
import NavButtons from '../../components/NavButtons';
import { lang } from '../../constants';
import explainer from '../../images/explainer.svg';
import explainerFR from '../../images/explainerFR.svg';
import studyArea from '../../images/studyArea.svg';
import studyAreaFR from '../../images/studyAreaFR.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& p': {
      padding: '1em 0',
    },
  },
  imageContainer: {
    textAlign: 'center',
    backgroundColor: '#F8F8F8',
    padding: '1em',
    margin: '1em 0',
    '& img': {
      maxWidth: '50em',
    },
  },
  hr: {
    marginTop: 0,
    backgroundColor: theme.palette.grey.charcoal,
    height: '1px',
  },
  blueHr: {
    backgroundColor: theme.palette.teal.blue,
    height: '3px',
    marginBottom: 0,
  },
  header: {
    marginTop: '1em',
    color: theme.palette.teal.blue,
  },
}));

const Data = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div style={{ paddingTop: '2em' }}>
      <BackButton />
      <Typography variant="h4" className={classes.header}>
        {intl.formatMessage({ id: 'pages.data.body.title' })}
      </Typography>
      <hr className={classes.blueHr} />

      <br />
      <NavButtons />
      <hr className={classes.hr} />
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Typography>
            {intl.formatMessage(
              { id: 'pages.data.body.text1' },
              {
                bold: <strong>{intl.formatMessage({ id: 'pages.data.body.bold0' })}</strong>,
              },
            )}
          </Typography>
        </Grid>

        <Grid item className={classes.imageContainer} style={{ padding: '0', minHeight: '28em' }}>
          <img alt="Sketch showing process of esa's from submission to decision." src={lang === 'en' ? explainer : explainerFR} />
        </Grid>

        <Grid item>
          <Typography>
            {intl.formatMessage({ id: 'pages.data.body.text2' })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">
            <strong>{intl.formatMessage({ id: 'pages.data.body.header1' })}</strong>
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            {intl.formatMessage({ id: 'pages.data.body.text3' },
              {
                link1: (
                  <a
                    href={intl.messages['pages.data.body.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.data.body.link1' })}
                  </a>
                ),
                link2: (
                  <a
                    href={intl.messages['pages.data.body.url2']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.data.body.link2' })}
                  </a>
                ),
              })}
          </Typography>
        </Grid>

        <Grid item className={classes.imageContainer}>
          <img alt="Graph showing effects and baseline" src={lang === 'en' ? studyArea : studyAreaFR} />
        </Grid>

        <Grid item>
          <Typography variant="h6">
            <strong>{intl.formatMessage({ id: 'pages.data.body.header2' })}</strong>
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            {intl.formatMessage({ id: 'pages.data.body.text4' })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            {intl.formatMessage({ id: 'pages.data.body.footer' }, {
              link: (
                <a
                  href={intl.messages['pages.data.body.url3']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({ id: 'pages.data.body.link3' })}
                </a>),
            })}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Data;
