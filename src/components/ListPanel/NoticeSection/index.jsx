import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { IconExclamation } from '../../../icons';
import useAPI from '../../../hooks/useAPI';

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

const NoticeSection = () => {
  const classes = useStyles();
  const { notices } = useAPI();
  const intl = useIntl();
  return (
    <div className={classes.container}>
      <IconExclamation className={classes.icon} />
      { notices.indexOf('SEARCH_RESULT') !== -1 && (
        <Typography>
          {intl.formatMessage({ id: 'api.notice.SEARCH_RESULT' })}
        </Typography>
      )}
    </div>
  );
};

export default NoticeSection;
