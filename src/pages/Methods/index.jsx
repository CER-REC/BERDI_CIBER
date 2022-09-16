import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import NavButtons from '../../components/NavButtons';
import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& h6, p': {
      paddingTop: '1em',
    },
    '& h5': {
      color: theme.palette.blue.dark,
    },
    '& p': {
      fontSize: '2rem',
      lineHeight: 1.65,
    },
  },
  header: {
    fontWeight: '900',
    fontSize: '2rem',
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
  title: {
    marginTop: '1em',
    color: theme.palette.teal.blue,
  },
  notice: {
    marginTop: '1em',
    backgroundColor: theme.palette.teal.light,
    borderRadius: 10,
    padding: '1em',
  },
}));

const Methods = () => {
  // TODO: Move this ref to the new IK section when added
  const ref = useRef();
  const intl = useIntl();
  const classes = useStyles();
  const { config } = useConfig();

  useEffect(() => {
    if (config.fragment === 'ikInformation') {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [config]);

  return (
    <div style={{ paddingTop: '2em' }}>
      <BackButton />
      <Typography variant="h4" className={classes.title}>
        {intl.formatMessage({ id: 'pages.methods.body.title' })}
      </Typography>
      <hr className={classes.blueHr} />

      <br />
      <NavButtons />
      <hr className={classes.hr} />

      <div className={classes.root}>
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
                  <a
                    href={intl.messages['pages.methods.body.section1.url']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  <a
                    href={intl.messages['pages.methods.body.section2.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section2.link1' })}
                  </a>
                ),
                link2: (
                  <a
                    href={intl.messages['pages.methods.body.section2.url2']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  <a
                    href={intl.messages['pages.methods.body.section3.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  <a
                    href={intl.messages['pages.methods.body.section4.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section4.link1' })}
                  </a>
                ),
              })}
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section4.paragraph2' },
              {
                link2: (
                  <a
                    href={intl.messages['pages.methods.body.section4.url2']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section4.link2' })}
                  </a>
                ),
              })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section4a.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section4a.paragraph1' })}
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
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.part1' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.table.title' })}
          </Typography>
          <ul>
            <li>
              <Typography>
                {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.table.bullet1' })}
              </Typography>
            </li>

            <li>
              <Typography>
                {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.table.bullet2' })}
              </Typography>
            </li>

            <li>
              <Typography>
                {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.table.bullet3' })}
              </Typography>
            </li>

            <li>
              <Typography>
                {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.table.bullet4' })}
              </Typography>
            </li>
          </ul>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section6.paragraph2.part2' })}
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
            {intl.formatMessage({ id: 'pages.methods.body.section7.paragraph1' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section7.paragraph2' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section7.paragraph3' })}
          </Typography>
        </section>

        <section ref={ref}>
          <Typography variant="h5" style={{ paddingTop: '1em' }}>
            {intl.formatMessage({ id: 'pages.methods.body.section8.header' })}
          </Typography>

          <Typography>
            {
            intl.formatMessage(
              { id: 'pages.methods.body.section8.body1' },
              {
                link: (
                  <a
                    href={intl.messages['pages.methods.body.section8.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section8.link1' })}
                  </a>
                ),
              },
            )
          }
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section8.body2' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section8.body3' })}
          </Typography>
          <Typography>
            {
            intl.formatMessage(
              { id: 'pages.methods.body.section8.body4' },
              {
                link: (
                  <a
                    href={intl.messages['pages.methods.body.section8.url4']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section8.link4' })}
                  </a>
                ),
              },
            )
          }
          </Typography>
          <Typography>
            {
            intl.formatMessage(
              { id: 'pages.methods.body.section8.body5' },
              {
                link: (
                  <a
                    href={intl.messages['pages.methods.body.section8.emailURL']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section8.emailLink' })}
                  </a>
                ),
              },
            )
          }
          </Typography>
          <Typography>
            {
            intl.formatMessage(
              { id: 'pages.methods.body.section8.body6' },
              {
                link: (
                  <a
                    href={intl.messages['pages.methods.body.section8.url6']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section8.link6' })}
                  </a>
                ),
              },
            )
          }
          </Typography>

          <Typography classes={{ root: classes.notice }}>
            {
          intl.formatMessage(
            { id: 'pages.methods.body.section8.notice' },
            {
              link: (
                <a
                  href={intl.messages['pages.methods.body.section8.emailURL']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({ id: 'pages.methods.body.section8.emailLink' })}
                </a>
              ),
            },
          )
        }
          </Typography>
        </section>

        <section>
          <Typography variant="h5" style={{ paddingTop: '1em' }}>
            {intl.formatMessage({ id: 'pages.methods.body.section9.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section9.paragraph1' })}
          </Typography>
        </section>

        <section>
          <Typography className={classes.header}>
            {intl.formatMessage({ id: 'pages.methods.body.section10.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.methods.body.section10.paragraph1' },
              {
                link1: (
                  <a
                    href={intl.messages['pages.methods.body.section10.url1']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.methods.body.section10.link1' })}
                  </a>
                ),
              })}
          </Typography>
        </section>
      </div>
    </div>
  );
};
export default Methods;
