import { Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import RelatedTopicsDialog from '../RelatedTopicsDialog';

const useStyles = makeStyles((theme) => ({
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
  link: {
    color: theme.palette.teal.blue,
    textDecoration: 'underline',
    '& span': {
      cursor: 'pointer',
    },
  },
}));

const RelatedTopics = ({ data }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const handleClickOpen = (topic) => {
    setDialogData(
      {
        topic,
        title: intl.formatMessage({ id: `common.VCLabels.${topic}.label` }),
        description: intl.formatMessage({ id: `common.VCLabels.${topic}.description` }),
      },
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Filters out 0 values, sorts them in descending order, then converts object to array
  const sortedValueComponents = Object.entries(data)
    .filter((item) => item[1] > 0)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  return (
    <div className={classes.root}>
      <RelatedTopicsDialog open={open} onClose={handleClose} data={dialogData} />

      <Typography variant="h6">
        {intl.formatMessage({ id: 'components.listPanel.relatedTopics.title' })}
      </Typography>

      <Grid container justify="flex-start" alignItems="center">
        {sortedValueComponents.map((topic) => (
          <Grid item key={topic} className={classes.relatedTopics} xs={4}>
            <Typography className={classes.link} onClick={() => handleClickOpen(topic)}>
              <span>
                {intl.formatMessage({ id: `common.VCLabels.${topic}.label` })}
              </span>
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
