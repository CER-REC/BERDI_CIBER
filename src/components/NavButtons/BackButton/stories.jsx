import React from 'react';
import BackButton from '.';
import withConfigAndGQL from '../../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../../.storybook/utils';
import ReadMe from './README.md';

storiesForComponent('Components/NavButtons/BackButton', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .add('default', () => (
    <BackButton />
  ));
