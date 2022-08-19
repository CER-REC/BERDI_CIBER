import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import YouTube from '../../components/YouTube';
import BackButton from '../../components/BackButton';
import NavButtons from '../../components/NavButtons';
import { lang, protectingEnvironmentYoutube } from '../../constants';
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
  video: {
    width: '75%',
    margin: 'auto',
  },
  videoTranscript: {
    marginTop: '1em',
    '& p': {
      padding: 'unset',
    },
    '& p:not(:first-of-type)': {
      paddingTop: 0,
    },
    '& p:last-of-type': {
      paddingBottom: 0,
    },
  },
}));

const Data = () => {
  const classes = useStyles();
  const intl = useIntl();

  const contactUs = (
    <a href={intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.contactUsUrl' })}>
      {intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.contactUsText' })}
    </a>
  );

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
          <img alt={intl.formatMessage({ id: 'pages.data.body.imgAlt1' })} src={lang === 'en' ? explainer : explainerFR} />
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
          <img alt={intl.formatMessage({ id: 'pages.data.body.imgAlt2' })} src={lang === 'en' ? studyArea : studyAreaFR} />
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
          <Typography variant="h6">
            <strong>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.header1' })}</strong>
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'pages.data.protectingEnvironment.text1' })}
          </Typography>
          <YouTube videoId={protectingEnvironmentYoutube[lang]} className={classes.video} />
          <details className={classes.videoTranscript}>
            <summary>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.heading' })}</summary>
            <Typography variant="body1" component="div">
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text1' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text2' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text3' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text4' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text6' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text7' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text8' })}</p>
              <ul>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.protections.text1' })}</li>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.protections.text2' })}</li>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.protections.text3' })}</li>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.protections.text4' })}</li>
              </ul>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text9' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text10' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text11' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text12' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text13' })}</p>
              <ul>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.inspectors.text1' })}</li>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.inspectors.text2' })}</li>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.inspectors.text3' })}</li>
                <li>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.inspectors.text4' })}</li>
              </ul>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text14' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text15' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text16' })}</p>
              <p>{intl.formatMessage({ id: 'pages.data.protectingEnvironment.transcript.text17' }, { contactUs })}</p>
            </Typography>
          </details>
        </Grid>
      </Grid>
    </div>
  );
};

export default Data;
