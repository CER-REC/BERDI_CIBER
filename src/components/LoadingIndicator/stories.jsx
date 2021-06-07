import React from 'react';
import LoadingIndicator from './index';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

export default storiesForComponent('Components/LoadingIndicator', module, ReadMe);

// eslint-disable-next-line react/prop-types
const Template = ({ type, fullHeight }) => <LoadingIndicator type={type} fullHeight={fullHeight} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'app',
  fullHeight: false,
};
