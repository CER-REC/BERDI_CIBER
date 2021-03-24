import React from 'react';

import BetaAlert from '../../components/BetaAlert';
import SearchPanel from '../../components/SearchPanel';
import Disclaimer from './Disclaimer';
import Discoveries from './Discoveries';
import TitleContent from './TitleContent';

const Landing = () => (
  <div className="Landing">
    <BetaAlert />
    <TitleContent />
    <SearchPanel hasFilter={false} />
    <Disclaimer />
    <Discoveries />
  </div>
);

export default Landing;
