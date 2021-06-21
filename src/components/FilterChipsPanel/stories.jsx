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
      config: {
        searches: ['test search'],
        applicationIds: ['Application Test 1'],
        regions: ['AB', 'BC'],
        startDate: new Date(),
        endDate: new Date(),
        commodities: ['GAS', 'OIL'],
        projectTypes: ['LARGE'],
        statuses: ['ABANDONMENT_PENDING', 'RESCINDED'],
        contentTypes: ['TABLE'],
      },
    },
  },
);

export const Primary = () => <FilterChipsPanel />;
