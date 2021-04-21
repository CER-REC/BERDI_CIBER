import React, { useEffect, useRef } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import BetaAlert from '../../components/BetaAlert';
import NavButtons from '../../components/NavButtons';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles({
  root: {
    '& .alert-info > :first-child::before': {
      paddingTop: '4px',
    },
    '& h6, p': {
      paddingBottom: '1em',
    },
  },
  imageSection: {
    '& img': {
      marginLeft: '20%',
    },
  },
});

const Project = () => {
  const classes = useStyles();
  const intl = useIntl();
  const learnRef = useRef();
  const { config } = useConfig();

  useEffect(() => {
    if (config.fragment === 'learn') {
      learnRef.current.scrollIntoView(true);
    }
  }, [config]);

  return (
    <>
      <br />
      <BetaAlert />
      <br />
      <NavButtons />
      <div className={classes.root}>

        <section>
          <Typography variant="h6">
            {intl.formatMessage({ id: 'pages.project.body.section1.header' })}
          </Typography>

          <Typography>
            {intl.formatMessage(
              { id: 'pages.project.body.section1.text1' },
              {
                boldText: (
                  <strong>
                    {intl.formatMessage(
                      { id: 'pages.project.body.section1.boldText1' },
                    )}
                  </strong>
                ),
              },
            )}
          </Typography>

          <Typography>
            {intl.formatMessage(
              { id: 'pages.project.body.section1.text2' },
              {
                boldText: (
                  <strong>
                    {intl.formatMessage(
                      { id: 'pages.project.body.section1.boldText2' },
                    )}
                  </strong>
                ),
              },
            )}
          </Typography>

          <Typography>
            {intl.formatMessage(
              { id: 'pages.project.body.section1.text3' },
              {
                boldText: (
                  <strong>
                    {intl.formatMessage(
                      { id: 'pages.project.body.section1.boldText3' },
                    )}
                  </strong>
                ),
              },
            )}
          </Typography>
        </section>

        <section className="alert alert-info" ref={learnRef}>
          <Typography variant="h6">
            {intl.formatMessage({ id: 'pages.project.body.section2.header1' })}
          </Typography>

          <Typography style={{ paddingBottom: '0' }}>
            {intl.formatMessage({ id: 'pages.project.body.section2.text1' })}
          </Typography>

          <Typography style={{ fontWeight: '700', textAlign: 'right' }}>
            {intl.formatMessage({ id: 'pages.project.body.section2.bold1' })}
          </Typography>

          <Typography style={{ display: 'inline' }}>
            {intl.formatMessage(
              { id: 'pages.project.body.section2.text2' },
              {
                toolName: (
                  <strong>
                    {intl.formatMessage({ id: 'common.toolName' })}
                  </strong>
                ),
              },
            )}

            {intl.formatMessage({ id: 'pages.project.body.section2.text3' })}
          </Typography>
          <Typography style={{ display: 'inline' }}>
            <strong>
              {intl.formatMessage(
                { id: 'pages.project.body.section2.bold2' },
                {
                  email: (
                    <a href={`mailto:${intl.messages['pages.project.body.section2.email1']}`}>
                      {intl.formatMessage({ id: 'pages.project.body.section2.email1' })}
                    </a>
                  ),
                },
              )}
            </strong>
          </Typography>
        </section>

        <section>
          <Typography variant="h6">
            {intl.formatMessage({ id: 'pages.project.body.section3.header1' })}
          </Typography>

          <Typography>
            {intl.formatMessage({ id: 'pages.project.body.section3.text1' })}
          </Typography>
        </section>
      </div>
    </>
  );
};

export default Project;
