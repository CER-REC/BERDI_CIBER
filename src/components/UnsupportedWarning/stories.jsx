import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import UnsupportedWarning from '.';
import ReadMe from './README.md';

export default storiesForComponent('Components/UnsupportedWarning', UnsupportedWarning, ReadMe);

const Template = (args) => <UnsupportedWarning {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'resolution',
};
