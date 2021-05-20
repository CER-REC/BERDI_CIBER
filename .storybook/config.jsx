import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { addDecorator, configure, addParameters } from '@storybook/react';
import Adapter from 'enzyme-adapter-react-16';
import { configure as enzyme } from 'enzyme';
import requireContext from 'require-context.macro';
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
import withWETTemplate from './addon-WET-template/index';

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

// Automatically import all files named stories.jsx
const documentationStories = requireContext('../documentation/', true, /stories.jsx$/);
const componentStories = requireContext('../src/', true, /stories.jsx$/);

setIntlConfig({
  locales,
  defaultLocale: lang,
  getMessages: (locale) => i18nMessages[locale],
});

addDecorator(withIntl);
addDecorator(addReadme);
addDecorator(withWETTemplate);

configureReadme({
  // eslint-disable-next-line react/prop-types
  StoryPreview: ({ children }) => (
    <div style={{ padding: '32px 32px 0' }}>{children}</div>
  ),
});

addParameters({ viewport: { viewports, defaultViewport: 'fullscreen' } });
addParameters({
  options: {
    brandTitle: 'ESA DevDoc',
    panelPosition: 'bottom',
  },
});

addDecorator((storyFn, context) => {
  if (context.id === 'containers-app--within-wet') { return storyFn(); }
  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
});

enzyme({ adapter: new Adapter() });

configure(() => {
  documentationStories.keys()
    // Sorting Documentation|Introduction to the top
    .sort((a, b) => (a.startsWith('./Introduction/') ? -1 : a.localeCompare(b)))
    .forEach((filename) => documentationStories(filename));
  componentStories.keys().forEach((filename) => componentStories(filename));
}, module);
