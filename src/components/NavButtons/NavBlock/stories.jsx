import React from 'react';
import NavBlock from '.';
import withConfigAndGQL from '../../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../../.storybook/utils';
import ReadMe from './README.md';

export default storiesForComponent(
  'Components/NavButtons/NavBlock',
  module,
  ReadMe,
  { decorators: [withConfigAndGQL] },
);

export const Primary = () => <NavBlock />;
