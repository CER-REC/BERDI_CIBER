import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import BetaAlert from '../../components/BetaAlert';
import NavButtons from '../../components/NavButtons';
import { lang } from '../../constants';
import explainer from '../../images/explainer.svg';
import explainerFR from '../../images/explainerFR.svg';
import studyArea from '../../images/studyArea.svg';
import studyAreaFR from '../../images/studyAreaFR.svg';

const useStyles = makeStyles({
  root: {
    '& p': {
      padding: '1em 0',
    },
  },
  imageContainer: {
    textAlign: 'center',
    border: '2px solid #C0C0C0',
    backgroundColor: '#F8F8F8',
    padding: '1em',
    margin: '1em 0',
    '& img': {
      maxWidth: '50em',
    },
  },
});

const Data = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <br />
      <BetaAlert />
      <br />
      <NavButtons />
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Typography variant="h5">{intl.formatMessage({ id: 'pages.data.body.title' })}</Typography>
        </Grid>

        <Grid item>
          <Typography>{intl.formatMessage({ id: 'pages.data.body.text1' })}</Typography>
          <Typography>{intl.formatMessage({ id: 'pages.data.body.caption1' })}</Typography>
        </Grid>

        <Grid item className={classes.imageContainer} style={{ padding: '0', minHeight: '28em' }}>
          <img alt="Sketch showing process of esa's from submission to decision." src={lang === 'en' ? explainer : explainerFR} />
        </Grid>

        <Grid item>
          <Typography>
            {intl.formatMessage(
              { id: 'pages.data.body.text2' },
              {
                bold1: (
                  <strong>
                    {intl.formatMessage({ id: 'pages.data.body.bold1' })}
                  </strong>
                ),
                bold2: (
                  <strong>
                    {intl.formatMessage({ id: 'pages.data.body.bold2' })}
                  </strong>
                ),
              },
            )}
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
                  <a href={intl.messages['pages.data.body.url1']}>
                    {intl.formatMessage({ id: 'pages.data.body.link1' })}
                  </a>
                ),
                link2: (
                  <a href={intl.messages['pages.data.body.url2']}>
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
                <a href={intl.messages['pages.data.body.url3']}>
                  {intl.formatMessage({ id: 'pages.data.body.link3' })}
                </a>),
            })}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Data;
