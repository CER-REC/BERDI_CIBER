import React from 'react';
import FullButtons from '.';
import withConfigAndGQL from '../../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../../.storybook/utils';
import ReadMe from './README.md';

storiesForComponent('Components/NavButtons/FullButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .add('default', () => (
    <FullButtons />
  ));
