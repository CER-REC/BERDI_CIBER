import React from 'react';
import AccuracyAlert from '.';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

storiesForComponent('Components/AccuracyAlert', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .add('default', () => (
    <AccuracyAlert />
  ));
