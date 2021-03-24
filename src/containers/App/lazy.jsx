import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import useConfig, { ConfigProvider } from '../../hooks/useConfig';
import Landing from '../../pages/Landing';
import Page1 from '../../pages/Page1';
import Page2 from '../../pages/Page2';
import Page3 from '../../pages/Page3';
import Search from '../../pages/Search';
import theme from './theme';

const Content = () => {
  const { config } = useConfig();

  return (
    <>
      {config.page === 'landing' && <Landing />}
      {config.page === 'page1' && <Page1 />}
      {config.page === 'page2' && <Page2 />}
      {config.page === 'page3' && <Page3 />}
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
