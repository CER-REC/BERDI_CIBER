import React from 'react';
import { newStoriesForComponent } from '../../../.storybook/utils';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import ReadMe from './README.md';

export default newStoriesForComponent(
  'Components/NavButtons',
  NavButtons,
  ReadMe,
  {
    decorators: [withConfigAndGQL],
    parameters: { config: { page: 'search' } },
  },
);

export const Primary = () => <NavButtons />;
