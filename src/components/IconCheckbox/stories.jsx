import React from 'react';
import IconCheckbox from '.';
import { newStoriesForComponent } from '../../../.storybook/utils';

export default newStoriesForComponent('Components/IconCheckbox', IconCheckbox, '');

// eslint-disable-next-line react/prop-types
const Template = ({ checked }) => <IconCheckbox checked={checked} />;

export const Primary = Template.bind({});
Primary.args = {
  checked: false,
};
