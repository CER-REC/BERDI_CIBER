import React from 'react';
import SmallButtons from '..';
import withConfigAndGQL from '../../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../../.storybook/utils';
import ReadMe from './README.md';

storiesForComponent('Components/NavButtons/SmallButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ config: { page: 'methods' } })
  .add('default', () => (
    <SmallButtons />
  ));
