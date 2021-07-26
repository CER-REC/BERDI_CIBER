import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ListPanel from '.';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

export default storiesForComponent(
  'Components/ListPanel',
  module,
  ReadMe,
  {
    decorators: [withConfigAndGQL],
    parameters: {
      config: {
        page: 'search',
        searches: ['test search'],
      },
    },
  },
);

export const Primary = () => <ListPanel />;
