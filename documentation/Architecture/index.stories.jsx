import React from 'react';
import { storiesOf } from '@storybook/react';
import HighLevel from './highLevel.md';
import Components from './components.md';
import Containers from './containers.md';
import Translations from './translations.md';

const noop = () => <></>;
storiesOf('Documentation|Architecture', module)
  .add('High Level', noop, { readme: { content: HighLevel } })
  .add('Components', noop, { readme: { content: Components } })
  .add('Containers', noop, { readme: { content: Containers } })
  .add('Translations', noop, { readme: { content: Translations } });
