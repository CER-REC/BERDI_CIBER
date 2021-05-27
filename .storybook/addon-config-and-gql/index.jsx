import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeDecorator } from '@storybook/addons';

import useConfig, { ConfigProvider } from '../../src/hooks/useConfig';
import { initialState } from '../../src/hooks/reducer';
import client from '../apolloClient';

const MockConfig = ({ state, children }) => {
  const [isMocked, setIsMocked] = useState(!state);
  const { config, configDispatch } = useConfig();
  const hasURLStateLoaded = config !== initialState;

  useEffect(() => {
    // Need to wait for the URL state to load first due to the bottom up ordering of hook operations
    if (!hasURLStateLoaded || !state) {
      return;
    }

    configDispatch({
      type: 'changed',
      payload: state,
    });
    setIsMocked(true);
  }, [hasURLStateLoaded, state, configDispatch, setIsMocked]);

  if (!isMocked) {
    return 'Mocking config...';
  }

  return children;
};

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
