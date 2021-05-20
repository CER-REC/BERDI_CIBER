import React from 'react';
import AccuracyAlert from '.';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';
import withWETTemplate from '../../../.storybook/addon-WET-template';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

storiesForComponent('Components/AccuracyAlert', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addDecorator(withWETTemplate)
  .addParameters({ mockConfigBasic: { page: 'search' } })
  .add('default', () => (
    <AccuracyAlert />
  ));
