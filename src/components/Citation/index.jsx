import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  root: {
    '& h6': { fontWeight: 700 },
    '& p': { paddingTop: '1em' },
  },
  cite: {
    background: 'white',
    color: 'black',
    display: 'block',
    fontWeight: 500,
    padding: '0.5em 3em',
    fontFamily: 'Roboto Mono',
  },
});

const Citation = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <Typography component="h6">
        {intl.formatMessage({ id: 'components.citation.title' })}
      </Typography>
      <Typography>
        {
          intl.formatMessage(
            { id: 'components.citation.body' },
            {
              cite: (
                <span className={classes.cite}>
                  {intl.formatMessage(
                    { id: 'components.citation.cite' },
                    {
                      date: new Date().toLocaleDateString(`${intl.locale}-CA`, { month: 'long', day: 'numeric', year: 'numeric' }),
                      website: (
                        <a href={intl.formatMessage({ id: 'components.citation.website' })} target="_blank" rel="noopener noreferrer">
                          {intl.formatMessage({ id: 'components.citation.website' })}
                        </a>
                      ),
                      doiWebsite: (
                        <a href={intl.formatMessage({ id: 'components.citation.doiWebsite' })} target="_blank" rel="noopener noreferrer">
                          {intl.formatMessage({ id: 'components.citation.doiWebsite' })}
                        </a>
                      ),
                    },
                  )}
                </span>
              ),
            },
          )
        }
      </Typography>
    </div>
  );
};

export default Citation;
