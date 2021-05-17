import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';

import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import ReadMe from './README.md';

storiesForComponent('Components/NavButtons/BackButton', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'search' } })
  .addDecorator(withKnobs)
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/LargeButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'landing' } })
  .addDecorator(withKnobs)
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/SmallButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'methods' } })
  .addDecorator(withKnobs)
  .add('default', () => (
    <NavButtons />
  ));
