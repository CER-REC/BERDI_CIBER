import React from 'react';
import NavButtons from '../../components/NavButtons';
import SearchPanel from '../../components/SearchPanel';
import TopicsFilter from '../../components/TopicsFilter';
import Disclaimer from './Disclaimer';
import Discoveries from './Discoveries';
import ExploreHeader from '../../components/ExploreHeader';

const Landing = () => (
  <div className="Landing">
    <SearchPanel hasFilter={false} />
    <ExploreHeader />
    <TopicsFilter />
    <Disclaimer />
    <Discoveries />
    <NavButtons />
  </div>
);

export default Landing;
