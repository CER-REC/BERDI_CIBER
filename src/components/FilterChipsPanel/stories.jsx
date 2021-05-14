import React from 'react';
import { withKnobs, array } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';
import FilterChipsPanel from './index';

storiesForComponent('Components/FilterChipsPanel', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FilterChipsPanel
      initialState={array('Chips', ['filter1', 'filter2', 'filter3'])}
    />
  ));
