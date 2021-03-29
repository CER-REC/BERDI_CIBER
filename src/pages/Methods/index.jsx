import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import BetaAlert from '../../components/BetaAlert';
import NavButtons from '../../components/NavButtons';
import { API_HOST, applicationPath, lang } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& p, h6': {
      paddingTop: '1em',
    },
    '& h5': {
      color: theme.palette.blue.dark,
    },
  },
  header: {
    fontWeight: '900',
    fontSize: '17px',
  },
}));

const Methods = () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <>
      <br />
      <BetaAlert />
      <br />
      <NavButtons />

      <div className={classes.root}>
        <Typography variant="h5">
          {intl.formatMessage({ id: 'pages.methods.body.title' })}
        </Typography>

        <section>
          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section1.paragraph1' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section1.paragraph2' })}
          </Typography>

          <Typography>
            {intl.formatMessage(
              { id: 'pages.methods.body.section1.paragraph3' },
              {
                link: (
                  <a href={intl.formatMessage({ id: 'pages.methods.body.section1.url' })}>
                    {intl.formatMessage({ id: 'pages.methods.body.section1.link' })}
                  </a>
                ),
              },
            )}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section2.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section2.paragraph1' },
              {
                link1: (
                  <a href={`${API_HOST}/${applicationPath[lang]}${intl.formatMessage({ id: 'pages.methods.body.section2.url1' })}`}>
                    {intl.formatMessage({ id: 'pages.methods.body.section2.link1' })}
                  </a>
                ),
                link2: (
                  <a href={intl.formatMessage({ id: 'pages.methods.body.section2.url2' })}>
                    {intl.formatMessage({ id: 'pages.methods.body.section2.link2' })}
                  </a>
                ),
              })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section3.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section3.paragraph1' },
              {
                link1: (
                  <a href={intl.formatMessage({ id: 'pages.methods.body.section3.url1' })}>
                    {intl.formatMessage({ id: 'pages.methods.body.section3.link1' })}
                  </a>
                ),
              })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section4.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section4.paragraph1' },
              {
                link1: (
                  <a href={intl.formatMessage({ id: 'pages.methods.body.section4.url1' })}>
                    {intl.formatMessage({ id: 'pages.methods.body.section4.link1' })}
                  </a>
                ),
              })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section5.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section5.paragraph1' })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section6.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph1' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph3' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph4' })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section7.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section7.paragraph1' },
              {
                link1: (
                  <a href={intl.formatMessage({ id: 'pages.methods.body.section7.url1' })}>
                    {intl.formatMessage({ id: 'pages.methods.body.section7.link1' })}
                  </a>
                ),
              })}
          </Typography>
        </section>
      </div>
    </>
  );
};
export default Methods;
