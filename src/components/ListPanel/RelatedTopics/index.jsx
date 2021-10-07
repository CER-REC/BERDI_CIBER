import { Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import RelatedTopicsDialog from '../RelatedTopicsDialog';
import getScore from '../../../utilities/getScore';
import { socioEconomicTopics } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    padding: '1em 3em',
  },
  relatedTopics: {
    paddingBottom: '1em',
    paddingRight: '6.5em',
  },
  topicsColumn: {
    maxHeight: '200px',
    width: 'calc(155px + 6.5em)',
    // Because design specified a max height for the columns,
    // the height needs to be adjusted manually as the screen sizes down to remain responsive
    '@media screen and (max-width: 1185px)': {
      maxHeight: '220px',
    },
    '@media screen and (max-width: 980px)': {
      maxHeight: '275px',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    paddingBottom: '1em',
  },
  link: {
    color: theme.palette.teal.blue,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  },
}));

const RelatedTopics = ({ data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const maxValueComponent = Math.max(...Object.values(data).filter(Number));

  const [dialogData, setDialogData] = useState(null);

  const handleClickOpen = (topic) => {
    const score = getScore(data[topic], maxValueComponent);
    const type = socioEconomicTopics.find((item) => item === topic) ? 'socioEconomic' : 'environmental';
    setDialogData(
      {
        topic,
        title: intl.formatMessage({ id: `common.vcLabels.${topic}.label` }),
        description: intl.formatMessage({ id: `common.vcLabels.${topic}.description` }),
        score,
        type,
      },
    );
  };

  const handleClose = () => {
    setDialogData(null);
  };

  // Filters out 0 values, sorts them in descending order, then converts object to array
  const sortedValueComponents = Object.entries(data)
    .filter((item) => item[1] > 0)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  return (
    <div className={classes.root}>
      {dialogData
      && (
      <RelatedTopicsDialog
        open={Boolean(dialogData)}
        onClose={handleClose}
        data={dialogData}
      />
      )}

      <Typography variant="h6" className={classes.title}>
        {intl.formatMessage({ id: 'components.listPanel.relatedTopics.title' })}
      </Typography>

      <Grid container direction="column" className={classes.topicsColumn}>
        {sortedValueComponents.map((topic) => (
          <Grid item key={topic} className={classes.relatedTopics}>
            <Typography component="span" className={classes.link} onClick={() => handleClickOpen(topic)}>
              {intl.formatMessage({ id: `common.vcLabels.${topic}.label` })}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RelatedTopics;

RelatedTopics.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
