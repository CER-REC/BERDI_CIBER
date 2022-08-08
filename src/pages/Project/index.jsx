import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import NavButtons from '../../components/NavButtons';
import BackButton from '../../components/BackButton';
import useConfig from '../../hooks/useConfig';
import papers from '../../images/pages/papers.png';
import process from '../../images/pages/process.png';

const useStyles = makeStyles((theme) => ({
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
    <div style={{ paddingTop: '2em' }}>
      <BackButton />
      <Typography variant="h4" className={classes.header}>
        {intl.formatMessage({ id: 'pages.project.body.section1.header' })}
      </Typography>
      <hr className={classes.blueHr} />

      <br />
      <NavButtons />
      <hr className={classes.hr} />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={9} style={{ paddingTop: '2em' }}>
            <Typography>
              {intl.formatMessage(
                { id: 'pages.project.body.section1.text1' },
                {
                  boldText: (
                    <strong>
                      {intl.formatMessage({ id: 'pages.project.body.section1.boldText1' })}
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
                  openGov: (
                    <a
                      href={intl.formatMessage({ id: 'pages.project.body.section1.openGovLink' })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {intl.formatMessage({ id: 'pages.project.body.section1.openGov' })}
                    </a>
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
                  github: (
                    <a
                      href={intl.formatMessage({ id: 'pages.project.body.section1.githubLink' })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {intl.formatMessage({ id: 'pages.project.body.section1.github' })}
                    </a>
                  ),
                },
              )}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <img src={papers} alt="" />
            <img src={process} alt="" />
          </Grid>

        </Grid>

        <Grid item xs={9} className="alert alert-info" ref={learnRef}>
          <Typography variant="h6">
            {intl.formatMessage({ id: 'pages.project.body.section2.header1' })}
          </Typography>

          <Typography style={{ display: 'inline' }}>
            {intl.formatMessage({ id: 'pages.project.body.section2.text1' })}

            <br />
            <br />

            {intl.formatMessage({ id: 'pages.project.body.section2.text2' },
              {
                email: (
                  <a
                    href={`mailto:${intl.messages['pages.project.body.section2.email']}?subject=${intl.messages['pages.project.body.section2.subject']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'pages.project.body.section2.email' })}
                  </a>
                ),
              })}
          </Typography>
        </Grid>
      </div>
    </div>
  );
};

export default Project;
