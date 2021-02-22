import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { fetch } from 'whatwg-fetch';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/fr';

import { /* lang, */ API_HOST } from '../../constants';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${API_HOST}/esa/graphql`,
  credentials: 'same-origin',
});
const client = new ApolloClient({ cache, link, fetch });
const LazyApp = React.lazy(() => import('./lazy'));

export default () => (
  <ApolloProvider client={client}>
    <Suspense fallback="Loading">
      <LazyApp />
    </Suspense>
  </ApolloProvider>
);
