import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import useConfig, { ConfigProvider } from '../../hooks/useConfig';
import Landing from '../../pages/Landing';
import Project from '../../pages/Project';
import Data from '../../pages/Data';
import Methods from '../../pages/Methods';
import Search from '../../pages/Search';
import theme from './theme';
import LegalDisclaimer from '../../components/LegalDisclaimer';

const Content = () => {
  const { config } = useConfig();
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const threeDaysInMS = 259200000;

  const updateTimestamp = () => {
    sessionStorage.setItem('expiryDate', new Date().getTime() + threeDaysInMS);
  };

  useEffect(() => {
    const timeout = sessionStorage.getItem('expiryDate') - new Date().getTime();

    if (timeout <= 0) {
      setDisclaimerOpen(true);
      return undefined;
    }

    const timeoutId = setTimeout(() => setDisclaimerOpen(true), timeout);

    return () => clearTimeout(timeoutId);
  }, [disclaimerOpen]);

  return (
    <>
      <LegalDisclaimer
        onClose={updateTimestamp}
        open={disclaimerOpen}
        setOpen={setDisclaimerOpen}
      />
      {config.page === 'landing' && <Landing />}
      {config.page === 'project' && <Project />}
      {config.page === 'data' && <Data />}
      {config.page === 'methods' && <Methods />}
      {config.page === 'search' && <Search />}
    </>
  );
};

export default () => (
  <ThemeProvider theme={theme}>
    <ConfigProvider>
      <Content />
    </ConfigProvider>
  </ThemeProvider>
);
