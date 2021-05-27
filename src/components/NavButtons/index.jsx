import React from 'react';
import SmallButtons from './SmallButtons';
import BackButton from './BackButton';
import FullButtons from './FullButtons';

import useConfig from '../../hooks/useConfig';

const NavButtons = () => {
  const { config: { page } } = useConfig();

  if (page === 'landing') {
    return (<FullButtons />);
  }
  if (page === 'search') {
    return <BackButton />;
  }
  return (<SmallButtons />);
};

export default NavButtons;
