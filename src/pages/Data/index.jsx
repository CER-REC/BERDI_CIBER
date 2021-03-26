import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import React from 'react';
import BetaAlert from '../../components/BetaAlert';
import sketch from '../../images/sketch.png';
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

        <Grid item className={classes.imageContainer}>
          <img alt="Sketch showing process of esa's from submission to decision." src={sketch} />
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
          <Typography>{intl.formatMessage({ id: 'pages.data.body.text3' })}</Typography>
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
                <a href="https://www.youtube.com/watch?v=cXLfhAI9hhw">
                  {intl.formatMessage({ id: 'pages.data.body.linkLabel' })}
                </a>),
            })}

          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Data;
