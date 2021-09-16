import React from 'react';
import Accreditations from '../../components/Accreditations';
import BetaAlert from '../../components/BetaAlert';
import ExploreHeader from '../../components/ExploreHeader';
import NavButtons from '../../components/NavButtons';
import SearchPanel from '../../components/SearchPanel';
import TopicsFilter from '../../components/TopicsFilter';
import Disclaimer from './Disclaimer';
import Discoveries from './Discoveries';

const Landing = () => (
  <div className="Landing">
    <BetaAlert />
    <SearchPanel hasFilter={false} />
    <ExploreHeader />
    <TopicsFilter />
    <Disclaimer />
    <Discoveries />
    <NavButtons />
    <Accreditations />
  </div>
);

export default Landing;
