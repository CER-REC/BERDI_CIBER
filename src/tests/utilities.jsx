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

const suppressMissingTranlslationError = (error) => {
  if (error.code === 'MISSING_TRANSLATION') {
    // eslint-disable-next-line no-console
    console.warn(error.message);

    return;
  }

  throw error;
};

const AppProviders = ({ config, children }) => (
  <ApolloProvider client={client}>
    <IntlProvider locale="en" onError={suppressMissingTranlslationError}>
      <ThemeProvider theme={theme}>
        <ConfigProvider>
          <MockConfig state={config}>
            {children}
          </MockConfig>
        </ConfigProvider>
      </ThemeProvider>
    </IntlProvider>
  </ApolloProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
};

AppProviders.defaultProps = {
  children: null,
  config: undefined,
};

const appRender = (component, options) => render(component, {
  // eslint-disable-next-line react/jsx-props-no-spreading
  wrapper: (props) => <AppProviders {...props} config={options?.config} />,
  ...options,
});

export * from '@testing-library/react';

export { appRender as render };
