import React from 'react';

import BetaAlert from '../../components/BetaAlert';
import SearchPanel from '../../components/SearchPanel';
import TitleContent from './TitleContent';

const Landing = () => {
  return (
    <>
      <BetaAlert />
      <TitleContent />
      <SearchPanel hasFilter={false} />
    </>
  );
};

export default Landing;
