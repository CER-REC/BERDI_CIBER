import React from 'react';
import Accreditations from '../../components/Accreditations';
import BetaAlert from '../../components/BetaAlert';
import NavButtons from '../../components/NavButtons';
import SearchPanel from '../../components/SearchPanel';
import TitleCard from '../../components/TitleCard';
import TopicsFilter from '../../components/TopicsFilter';
import Disclaimer from './Disclaimer';
import Discoveries from './Discoveries';

const Landing = () => (
  <div className="Landing">
    <BetaAlert />
    <TitleCard />
    <SearchPanel hasFilter={false} />
    <TopicsFilter />
    <Disclaimer />
    <Discoveries />
    <NavButtons />
    <Accreditations />
  </div>
);

export default Landing;
