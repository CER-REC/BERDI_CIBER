import React from 'react';
import { useIntl } from 'react-intl';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    padding: '1em 3em',
  },
  relatedTopics: {
    padding: '0 3em 1em 0',
    overflowWrap: 'break-word',
    maxWidth: '30em',
  },
});

// TODO: replace with api generated topics
const mockTopics = [
  'Physical and meteorological environment',
  'Navigation and navigation safety',
  'Human health and aesthetics',
  'Species at Risk or Species of Special Status and related habitat',
  'Acoustic environment',
  'Rights of Indigenous Peoples',
  'Soil and soil productivity',
  'Wildlife and wildlife habitat',
  'Air emissions',
  'Traditional land and resource use',
];

const RelatedTopics = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        {intl.formatMessage({ id: 'components.listPanel.relatedTopics' })}
      </Typography>

      <Grid container justify="flex-start" alignItems="center">
        {mockTopics.map((topic) => (
          <Grid item key={topic} className={classes.relatedTopics} xs={4}>
            <a href="https://wikipedia.org"><Typography>{topic}</Typography></a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RelatedTopics;
