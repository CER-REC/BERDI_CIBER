import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import ReadMe from './README.md';

export default storiesForComponent(
  'Components/NavButtons',
  module,
  ReadMe,
  {
    decorators: [withConfigAndGQL],
    parameters: { config: { page: 'search' } },
  },
);

export const Primary = () => <NavButtons />;
