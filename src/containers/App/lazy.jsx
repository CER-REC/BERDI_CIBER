import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';

import useConfig, { ConfigProvider } from '../../hooks/useConfig';
import { ConfirmationProvider } from '../../hooks/useConfirmation';
import Landing from '../Landing';
import Project from '../Project';
import Data from '../Data';
import Methods from '../Methods';
import Search from '../Search';
import theme from './theme';

const Content = () => {
  const { config } = useConfig();

  useEffect(() => {
    switch (config.page) {
      case 'search':
        break;
      default:
        if ((config.page !== 'search') && !config.fragment) {
          window.scrollTo(0, 0);
        }
        break;
    }
  }, [config.page, config.fragment]);

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
    <ConfirmationProvider>
      <ConfigProvider>
        <Content />
      </ConfigProvider>
    </ConfirmationProvider>
  </ThemeProvider>
);
