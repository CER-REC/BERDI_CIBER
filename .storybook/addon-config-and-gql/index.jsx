import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeDecorator } from '@storybook/addons';

import { ConfigProvider } from '../../src/hooks/useConfig';
import { ConfirmationProvider } from '../../src/hooks/useConfirmation';
import MockConfig from '../../src/tests/MockConfig';
import client from '../../src/tests/mocks/apolloClient';

const addConfigAndGQL = (storyFn, context) => (
  <ApolloProvider client={client}>
    <ConfirmationProvider>
      <ConfigProvider>
        <MockConfig state={context?.parameters?.config}>
          {storyFn(context)}
        </MockConfig>
      </ConfigProvider>
    </ConfirmationProvider>
  </ApolloProvider>
);

export default makeDecorator({
  name: 'withConfigAndGQL',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => addConfigAndGQL(getStory, context),
});
