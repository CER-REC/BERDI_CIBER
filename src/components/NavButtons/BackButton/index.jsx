import { ButtonBase, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import useConfig from '../../../hooks/useConfig';
import { reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  button: {
    textDecoration: 'underline',
    fontWeight: '900',
    color: theme.palette.button.blue,
    marginBottom: '1em',
  },
  altButton: {
    padding: '0.7em 0.3em',
    backgroundColor: '#EAEBED',
    borderRadius: '5px',
    boxShadow: '1px 1px #8A8B8D',
    color: theme.palette.teal.blue,
    '& span': {
      padding: '0 0.8em',
    },
  },
}));

const BackButton = ({ alt }) => {
  const { configDispatch } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const handleClick = useCallback(() => {
    reportSection('landing');
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'search/removed' });
    configDispatch({ type: 'page/changed', payload: 'landing' });
    window.scrollTo(0, 0);
  }, [configDispatch]);
  const createHandleClick = useCallback(() => (() => handleClick()), [handleClick]);

  if (alt) {
    return (
      <ButtonBase onClick={createHandleClick()} className={classes.altButton}>
        <span>{intl.formatMessage({ id: 'pages.altBack' })}</span>
      </ButtonBase>
    );
  }

  return (
    <ButtonBase onClick={createHandleClick()} className={classes.button}>
      {`> ${intl.formatMessage({ id: 'pages.back' })}`}
    </ButtonBase>
  );
};

export default BackButton;

BackButton.propTypes = {
  alt: PropTypes.bool,
};

BackButton.defaultProps = {
  alt: false,
};
