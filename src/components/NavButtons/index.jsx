import React from 'react';
import SmallButtons, { BackButton } from './SmallButtons';
import FullButtons from './FullButtons';

import useConfig from '../../hooks/useConfig';

export default () => {
  const { config: { page } } = useConfig();

  if (page === 'landing') {
    return (<FullButtons />);
  }
  if (page === 'search') {
    return <BackButton />;
  }
  return (<SmallButtons />);
};
