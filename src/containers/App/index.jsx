import { ApolloProvider } from '@apollo/react-hooks';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/polyfill';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React, { Suspense, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { fetch } from 'whatwg-fetch';

import { API_HOST, applicationPath, lang } from '../../constants';
import useAPI from '../../hooks/useAPI';
import i18nMessages from '../../i18n';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingIndicator from '../../components/LoadingIndicator';
import UnsupportedWarning from '../../components/UnsupportedWarning';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${API_HOST}/${applicationPath.en}/graphql?lang=${lang}`,
  credentials: 'same-origin',
});
const client = new ApolloClient({ cache, link, fetch });
const LazyApp = React.lazy(() => import('./lazy'));

const Loader = () => {
  let content;
  const { loading, error, translations } = useAPI();
  const messages = useMemo(
    () => ({ ...translations[lang], ...i18nMessages[lang] }),
    [translations],
  );

  if (window.innerWidth < 746) {
    content = <UnsupportedWarning type="resolution" />;
  // This will detect any version of IE up to and including IE11
  } else if (window.MSInputMethodContext && document.documentMode) {
    content = <UnsupportedWarning type="browser" />;
  } else if (loading) {
    content = <LoadingIndicator type="api" fullHeight />;
  } else if (error) {
    const APIError = () => { throw new Error(error); };

    content = <APIError />;
  } else {
    content = (
      <Suspense fallback={<LoadingIndicator type="app" fullHeight />}>
        <LazyApp />
      </Suspense>
    );
  }

  return (
    <IntlProvider locale={lang} defaultLocale={lang} messages={messages}>
      <ErrorBoundary>
        {content}
      </ErrorBoundary>
    </IntlProvider>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Loader />
  </ApolloProvider>
);
