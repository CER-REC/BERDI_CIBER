import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import { reportSection } from '../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: '900',
    color: theme.palette.button.blue,
  },
  altButton: {
    padding: '0.5em 1em',
    backgroundColor: theme.palette.grey.athens,
    borderRadius: '5px',
    boxShadow: '1px 1px #8A8B8D',
    color: theme.palette.teal.blue,
    fontSize: '1.6rem',
  },
}));

const BackButton = ({ isContentPage }) => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const handleClick = useCallback(() => {
    reportSection('landing');
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'search/removed' });
    configDispatch({ type: 'page/changed', payload: 'landing' });
  }, [configDispatch]);
  const createHandleClick = useCallback(() => (() => handleClick()), [handleClick]);

  if (isContentPage) {
    return (
      <Button onClick={createHandleClick()} className={classes.altButton}>
        {intl.formatMessage({ id: 'pages.altBack' })}
      </Button>
    );
  }

  return (
    <Button onClick={createHandleClick()} className={classes.button} color="inherit" disableRipple>
      {`< ${intl.formatMessage({ id: 'pages.back' })}`}
    </Button>
  );
};

export default BackButton;

BackButton.propTypes = {
  isContentPage: PropTypes.bool,
};

BackButton.defaultProps = {
  isContentPage: false,
};
