import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';

import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import ReadMe from './README.md';

storiesForComponent('Components/NavButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ config: { page: 'search' } })
  .add('default', () => (
    <NavButtons />
  ));
