import React from 'react';
import NavButtons from '../../components/NavButtons';
import SearchPanel from '../../components/SearchPanel';
import TopicsFilter from '../../components/TopicsFilter';
import Disclaimer from './Disclaimer';
import ExploreHeader from '../../components/ExploreHeader';
import OSDPFooter from '../../components/OSDPFooter';

const showOSDPFooter = false;
const Landing = () => (
  <div className="Landing">
    <SearchPanel hasTagline={false} />
    <ExploreHeader />
    <TopicsFilter />
    <NavButtons />
    <Disclaimer />
    {showOSDPFooter && <OSDPFooter />}
  </div>
);

export default Landing;
