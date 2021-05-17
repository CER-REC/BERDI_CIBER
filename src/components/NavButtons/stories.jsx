import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';

import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import ReadMe from './README.md';

storiesForComponent('Components/NavButtons/BackButton', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'search' } })
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/LargeButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'landing' } })
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/SmallButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'methods' } })
  .add('default', () => (
    <NavButtons />
  ));
