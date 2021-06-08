import React from 'react';
import LoadingIndicator from './index';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

export default storiesForComponent('Components/LoadingIndicator', module, ReadMe);

const Template = (args) => <LoadingIndicator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'app',
  fullHeight: false,
};
