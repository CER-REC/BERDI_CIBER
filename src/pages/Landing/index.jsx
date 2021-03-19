import React from 'react';

import BetaAlert from '../../components/BetaAlert';
import SearchPanel from '../../components/SearchPanel';
import Disclaimer from './Disclaimer';
import TitleContent from './TitleContent';

const Landing = () => {
  return (
    <div className="Landing">
      <BetaAlert />
      <TitleContent />
      <SearchPanel hasFilter={false} />
      <Disclaimer />
    </div>
  );
};

export default Landing;
