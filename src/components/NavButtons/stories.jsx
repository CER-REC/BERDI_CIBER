import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';

import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import FullButtonsReadMe from './FullButtonsREADME.md';
import SmallButtonsReadMe from './SmallButtonsREADME.md';
import BackButtonReadMe from './BackButtonREADME.md';

storiesForComponent('Components/NavButtons/BackButton', module, BackButtonReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'search' } })
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/FullButtons', module, FullButtonsReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'landing' } })
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/SmallButtons', module, SmallButtonsReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: { page: 'methods' } })
  .add('default', () => (
    <NavButtons />
  ));
