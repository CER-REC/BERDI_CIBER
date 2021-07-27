import React from 'react';
import { useArgs } from '@storybook/client-api';
import { storiesForComponent } from '../../../.storybook/utils';
import Cart from '.';
import ReadMe from './README.md';

export default storiesForComponent(
  'Components/Cart',
  module,
  ReadMe,
);

const Template = (args) => {
  const updateArgs = useArgs()[1];
  const onClose = () => updateArgs({ open: false });
  return <Cart {...args} onClose={onClose} />;
};

export const Primary = Template.bind({});
Primary.args = {
  open: false,
};
