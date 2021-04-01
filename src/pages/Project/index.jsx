import { Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import BetaAlert from '../../components/BetaAlert';
import stacksOfPaperImage from '../../images/stacksOfPaper.png';
import paperToSearchImage from '../../images/paperToSearch.png';
import NavButtons from '../../components/NavButtons';

const useStyles = makeStyles({
  root: {
    '& .alert-info > :first-child::before': {
      paddingTop: '4px',
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

  return (
    <>
      <br />
      <BetaAlert />
      <br />
      <NavButtons />

      <Grid container direction="column" className={classes.root}>
        <Grid item container direction="row" spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">
              {intl.formatMessage({ id: 'pages.project.body.header' })}
            </Typography>
            <br />
            <Typography>
              {intl.formatMessage(
                { id: 'pages.project.body.paragraph1' },
                {
                  boldText: (
                    <strong>
                      {intl.formatMessage(
                        { id: 'pages.project.body.boldText1' },
                      )}
                    </strong>
                  ),
                },
              )}
            </Typography>

            <br />
            <Typography>
              {intl.formatMessage(
                { id: 'pages.project.body.paragraph2' },
                {
                  boldText: (
                    <strong>
                      {intl.formatMessage(
                        { id: 'pages.project.body.boldText2' },
                      )}
                    </strong>
                  ),
                },
              )}
            </Typography>
            <br />
            <Typography>
              {intl.formatMessage(
                { id: 'pages.project.body.paragraph3' },
                {
                  boldText: (
                    <strong>
                      {intl.formatMessage(
                        { id: 'pages.project.body.boldText3' },
                      )}
                    </strong>
                  ),
                },
              )}
            </Typography>
            <br />
          </Grid>
          <Grid item xs={4} className={classes.imageSection}>
            <img src={stacksOfPaperImage} alt="A stack of paper" />
            <img src={paperToSearchImage} alt="Paper being turned into a web search" />
          </Grid>
        </Grid>

        <Grid item>
          <section className="alert alert-info">
            <Typography variant="h6">
              {intl.formatMessage({ id: 'pages.project.help.title' })}
            </Typography>
            <br />
            <Typography>
              {intl.formatMessage(
                { id: 'pages.project.help.text1' },
                {
                  boldText: (
                    <strong>
                      {intl.formatMessage({ id: 'common.toolName' })}
                    </strong>
                  ),
                },
              )}

              <br />
              <br />
              {intl.formatMessage(
                { id: 'pages.project.help.text2' },
                {
                  boldText: (
                    <strong>
                      {intl.formatMessage(
                        { id: 'pages.project.help.bold2' },
                        {
                          link: (
                            <a href="mailto:data.donnees@cer-rec.gc.ca">
                              data.donnees@cer-rec.gc.ca
                            </a>
                          ),
                        },
                      )}
                    </strong>),
                },
              )}
            </Typography>
          </section>
        </Grid>
      </Grid>
    </>
  );
};

export default Project;