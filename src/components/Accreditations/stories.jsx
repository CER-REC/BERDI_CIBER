import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Accreditations from '.';
import ReadMe from './README.md';

storiesForComponent('Components/Accreditations', module, ReadMe)
  .add('default', () => (
    <Accreditations />
  ));
