import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import CartButton from '.';
import ReadMe from './README.md';

export default storiesForComponent(
  'Components/CartButton',
  module,
  ReadMe,
  {
    decorators: [withConfigAndGQL],
  },
);

const Template = (args) => <CartButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    id: '0',
    type: 'TABLE',
    url: 'https://test',
  },
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  data: {
    id: '0',
    type: 'TABLE',
    url: null,
  },
};
Unavailable.parameters = { readme: { content: 'The CartButton also provides additional information when the download is not available.' } };
