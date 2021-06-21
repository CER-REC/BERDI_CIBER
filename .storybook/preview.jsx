import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addReadme, configureReadme } from 'storybook-readme';

// Load Locale Data
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/fr';

import { lang } from '../src/constants';
import i18nMessages from '../src/i18n';
import theme from '../src/containers/App/theme';
import { CONFIGURATION } from '../src/hooks/queries';
import client from '../src/tests/mocks/apolloClient';
import getI18NMessages from '../src/utilities/getI18NMessages';
import withWETTemplate from './addon-WET-template';

const locales = Object.keys(i18nMessages);
const viewports = {
  fullscreen: {
    name: 'Fullscreen',
    styles: { width: '100%', height: '100%' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '1200px', height: '100%' },
  },
  laptop: {
    name: 'Laptop',
    styles: { width: '1000px', height: '100%' },
  },
  ipad: {
    name: 'iPad',
    styles: { width: '768px', height: '100%' },
  },
};
const { configuration: { translations } } = client.readQuery({ query: CONFIGURATION });
const apiI18NMessages = getI18NMessages(translations);
const messages = {};

locales.forEach((locale) => {
  messages[locale] = {
    ...apiI18NMessages[locale],
    ...i18nMessages[locale],
  };
});

setIntlConfig({
  locales,
  defaultLocale: lang,
  getMessages: (locale) => messages[locale],
});

configureReadme({
  // eslint-disable-next-line react/prop-types
  StoryPreview: ({ children }) => (
    <div style={{ padding: '32px 32px 0' }}>{children}</div>
  ),
});

export const parameters = {
  options: {
    brandTitle: 'ESA DevDoc',
    panelPosition: 'bottom',
  },
  viewport: { viewports, defaultViewport: 'fullscreen' },
};

export const decorators = [
  withIntl,
  addReadme,
  withWETTemplate,
  (storyFn, context) => {
    if (context.id === 'containers-app--within-wet') { return storyFn(); }
    return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
  },
];
