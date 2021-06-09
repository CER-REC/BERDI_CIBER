import React from 'react';
import IconCheckbox from '.';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

export default storiesForComponent('Components/IconCheckbox', module, ReadMe);

const Template = (args) => <IconCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  checked: false,
};
