import React from 'react';
import README from './README.md';
import CHANGELOG from '../../CHANGELOG.md';

export default {
  title: 'Documentation/Introduction',
  component: module,
};

const Template = () => <></>;

export const ToTheDocument = Template.bind({});
ToTheDocument.parameters = { readme: { content: README } };

export const ChangeLog = Template.bind({});
ChangeLog.parameters = { readme: { content: CHANGELOG } };
