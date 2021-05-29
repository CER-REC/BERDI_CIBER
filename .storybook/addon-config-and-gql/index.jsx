import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeDecorator } from '@storybook/addons';

import { ConfigProvider } from '../../src/hooks/useConfig';
import MockConfig from '../../src/tests/MockConfig';
import client from '../apolloClient';

const addConfigAndGQL = (storyFn, context) => (
  <ApolloProvider client={client}>
    <ConfigProvider>
      <MockConfig state={context?.parameters?.config}>
        {storyFn(context)}
      </MockConfig>
    </ConfigProvider>
  </ApolloProvider>
);

export default makeDecorator({
  name: 'withConfigAndGQL',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => addConfigAndGQL(getStory, context),
});
