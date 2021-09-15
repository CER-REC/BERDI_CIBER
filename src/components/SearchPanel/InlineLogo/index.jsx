import React from 'react';
import { makeStyles } from '@material-ui/core';
import { lang } from '../../../constants';
import berdiLogo from '../../../images/landing/logo-berdi.svg';
import ciberLogo from '../../../images/landing/logo-ciber.svg';

const useStyles = makeStyles({
  image: {
    width: '10em',
    margin: '0 2em 0 1em',
  },
});

const InlineLogo = () => {
  const classes = useStyles();

  return (
    <div>
      <img alt="tool logo" src={lang === 'fr' ? ciberLogo : berdiLogo} className={classes.image} />
    </div>
  );
};

export default InlineLogo;
