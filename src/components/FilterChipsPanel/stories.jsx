import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';
import FilterChipsPanel from '.';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

export default storiesForComponent(
  'Components/FilterChipsPanel',
  module,
  ReadMe,
  {
    decorators: [withConfigAndGQL],
    parameters: {
      applicationIdLabels: { first: 'firstLabel' },
      config: {
        searches: ['test search'],
      },
    },
  },
);

export const Primary = () => <FilterChipsPanel />;
