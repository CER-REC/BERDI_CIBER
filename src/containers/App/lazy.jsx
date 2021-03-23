import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import useConfig, { ConfigProvider } from '../../hooks/useConfig';
import Landing from '../../pages/Landing';
import Project from '../../pages/Project';
import Data from '../../pages/Data';
import Methods from '../../pages/Methods';
import Search from '../../pages/Search';
import theme from './theme';

const Content = () => {
  const { config } = useConfig();

  return (
    <>
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
