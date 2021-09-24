import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import DotsRating from '../../DotsRating';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey.athens}`,
    padding: '2em',
    width: '48em',
    '&> div': {
      display: 'inline-block',
      fontSize: '2em',
      '&> div:last-child': { marginRight: '0.5em' },
    },
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 18,
    paddingBottom: '0.2em',
  },
  body: {
    color: theme.palette.grey.dark,
    fontSize: 14,
    paddingTop: '0.2em',
  },
}));

const Topic = ({ title, description, score, type }) => {
  const classes = useStyles();
  const intl = useIntl();
  const relationMessages = [
    intl.formatMessage({ id: 'components.svgButton.noRelation' }),
    intl.formatMessage({ id: 'components.svgButton.littleRelation' }),
    intl.formatMessage({ id: 'components.svgButton.someRelation' }),
    intl.formatMessage({ id: 'components.svgButton.strongRelation' }),
  ];

  return (
    <div className={classes.root}>
      <Typography classes={{ root: classes.title }}>{title}</Typography>
      {
        (typeof score === 'number') && (
          <>
            <DotsRating score={score} type={type} />
            <Typography classes={{ root: classes.body }} variant="body1" display="inline">{relationMessages[score]}</Typography>
          </>
        )
      }
      <Typography classes={{ root: classes.body }} variant="body1">{description}</Typography>
    </div>
  );
};

Topic.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  score: PropTypes.number,
  type: PropTypes.string.isRequired,
};

Topic.defaultProps = {
  score: null,
};

export default Topic;
