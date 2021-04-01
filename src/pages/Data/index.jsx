import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import React from 'react';
import BetaAlert from '../../components/BetaAlert';
import explainer from '../../images/Explainer-ESA-Transparent 1.png';
import studyArea from '../../images/studyArea.png';
import NavButtons from '../../components/NavButtons';

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
  },
});

const Data = () => {
  const classes = useStyles({});
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
        </Grid>

        <Grid item className={classes.imageContainer} style={{ padding: '0' }}>
          <img alt="Sketch showing process of esa's from submission to decision." src={explainer} />
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
          <Typography variant="h6"><strong>{intl.formatMessage({ id: 'pages.data.body.header1' })}</strong></Typography>
        </Grid>

        <Grid item>
          <Typography>
            {intl.formatMessage({ id: 'pages.data.body.text3' },
              {
                link1: (
                  <a href={intl.formatMessage({ id: 'pages.data.body.url1' })}>
                    {intl.formatMessage({ id: 'pages.data.body.link1' })}
                  </a>
                ),
                link2: (
                  <a href={intl.formatMessage({ id: 'pages.data.body.url2' })}>
                    {intl.formatMessage({ id: 'pages.data.body.link2' })}
                  </a>
                ),
              })}
          </Typography>
        </Grid>

        <Grid item className={classes.imageContainer}>
          <img alt="Graph showing effects and baseline" src={studyArea} />
        </Grid>

        <Grid item>
          <Typography><strong>{intl.formatMessage({ id: 'pages.data.body.header2' })}</strong></Typography>
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
                <a href={intl.formatMessage({ id: 'pages.data.body.url3' })}>
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
