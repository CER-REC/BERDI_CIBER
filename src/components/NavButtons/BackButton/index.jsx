import { ButtonBase, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import { reportSection } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  returnLink: {
    textDecoration: 'underline',
    fontWeight: '900',
    color: theme.palette.button.blue,
    marginBottom: '1em',
  },
}));

const BackButton = () => {
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

  return (
    <ButtonBase onClick={createHandleClick()} className={classes.returnLink}>
      {`> ${intl.formatMessage({ id: 'pages.back' }, { toolName: intl.formatMessage({ id: 'common.toolName' }) })}`}
    </ButtonBase>
  );
};

export default BackButton;
