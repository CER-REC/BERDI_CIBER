import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Rating from '../Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    border: '1px solid #EAEBED',
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
  const relationMessages = {
    0: intl.formatMessage({ id: 'components.svgButton.noRelation' }),
    1: intl.formatMessage({ id: 'components.svgButton.littleRelation' }),
    2: intl.formatMessage({ id: 'components.svgButton.someRelation' }),
    3: intl.formatMessage({ id: 'components.svgButton.strongRelation' }),
  };

  return (
    <div className={classes.root}>
      <Typography classes={{ root: classes.title }}>{title}</Typography>
      {
        (typeof score === 'number') && (
          <>
            <Rating score={score} type={type} />
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
