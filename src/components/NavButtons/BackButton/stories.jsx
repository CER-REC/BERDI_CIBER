import React from 'react';
import BackButton from '.';
import withConfigAndGQL from '../../../../.storybook/addon-config-and-gql';
import { newStoriesForComponent } from '../../../../.storybook/utils';
import ReadMe from './README.md';

export default newStoriesForComponent(
  'Components/NavButtons/BackButton',
  module,
  ReadMe,
  { decorators: [withConfigAndGQL] },
);

export const Primary = () => <BackButton />;
