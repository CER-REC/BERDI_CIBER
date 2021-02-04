import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
// import PageLayout from '../../components/PageLayout';
import TitleContent from '../../pages/TitleContent';
import useConfig, { ConfigProvider } from '../../hooks/useConfig';
import Page1 from '../../pages/Page1';
import Page2 from '../../pages/Page2';
import Page3 from '../../pages/Page3';

const Content = () => {
  const { config } = useConfig();

  return (
    <>
      <TitleContent />
      {config.page === 'page1' && <Page1 />}
      {config.page === 'page2' && <Page2 />}
      {config.page === 'page3' && <Page3 />}
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
