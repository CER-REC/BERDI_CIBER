import React from 'react';
import SmallButtons from '.';
import withConfigAndGQL from '../../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../../.storybook/utils';
import ReadMe from './README.md';

export default storiesForComponent(
  'Components/NavButtons/SmallButtons',
  module,
  ReadMe,
  { decorators: [withConfigAndGQL] },
);

export const Primary = () => <SmallButtons />;
