import React from 'react';

import BetaAlert from '../../components/BetaAlert';
import SearchPanel from '../../components/SearchPanel';
import Disclaimer from './Disclaimer';
import Discoveries from './Discoveries';
import NavButtons from '../../components/NavButtons';

const Landing = () => (
  <div className="Landing">
    <BetaAlert />
    <NavButtons />
    <SearchPanel hasFilter={false} />
    <Disclaimer />
    <Discoveries />
  </div>
);

export default Landing;
