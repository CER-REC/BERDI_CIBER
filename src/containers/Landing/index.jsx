import React from 'react';
import DisclaimerNotification from '../../components/DisclaimerNotification';
import NavButtons from '../../components/NavButtons';
import SearchPanel from '../../components/SearchPanel';
import TopicsFilter from '../../components/TopicsFilter';
import ExploreHeader from '../../components/ExploreHeader';
import OSDPFooter from '../../components/OSDPFooter';

const showOSDPFooter = false;
const Landing = () => (
  <div className="Landing">
    <DisclaimerNotification />
    <SearchPanel hasTagline={false} />
    <ExploreHeader />
    <TopicsFilter />
    <NavButtons />
    {showOSDPFooter && <OSDPFooter />}
  </div>
);

export default Landing;
