import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { IconExclamation } from '../../../icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
    color: theme.palette.grey.dark,
  },
  icon: {
    color: theme.palette.warning.main,
    marginRight: theme.spacing(0.5),
  },
}));

const NoticeSection = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <IconExclamation className={classes.icon} />
      <Typography>
        { message }
      </Typography>
    </div>
  );
};

NoticeSection.propTypes = {
  message: PropTypes.func.isRequired,
};

export default NoticeSection;
