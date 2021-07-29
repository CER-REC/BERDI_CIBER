import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import theme from '../containers/App/theme';
import { ConfigProvider } from '../hooks/useConfig';
import client from './mocks/apolloClient';
import MockConfig from './MockConfig';

const suppressMissingTranslationError = (error) => {
  if (error.code === 'MISSING_TRANSLATION') {
    // eslint-disable-next-line no-console
    console.warn(error.message);

    return;
  }

  throw error;
};

const AppProviders = ({ children }) => (
  <ApolloProvider client={client}>
    <IntlProvider locale="en" onError={suppressMissingTranslationError}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </IntlProvider>
  </ApolloProvider>
);

AppProviders.propTypes = { children: PropTypes.node };
AppProviders.defaultProps = { children: null };

const App = ({ configMocked, config, children }) => {
  if (!configMocked) {
    return (
      <AppProviders>
        {children}
      </AppProviders>
    );
  }

  return (
    <AppProviders>
      <ConfigProvider>
        <MockConfig state={config}>
          {children}
        </MockConfig>
      </ConfigProvider>
    </AppProviders>
  );
};

App.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
  configMocked: PropTypes.bool,
};

App.defaultProps = {
  children: null,
  config: undefined,
  configMocked: true,
};

const appRender = (component, options) => render(component, {
  wrapper: (props) => (
    <App
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      configMocked={options?.configMocked}
      config={options?.config}
    />
  ),
  ...options,
});

export * from '@testing-library/react';

export { appRender as render };
