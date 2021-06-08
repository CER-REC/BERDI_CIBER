import React from 'react';
import ProcessReadme from './process.md';
import DocumentationReadme from './documentation.md';

export default {
  title: 'Documentation/Testing',
  component: module,
};

const Template = () => <></>;

export const Process = Template.bind({});
Process.parameters = { readme: { content: ProcessReadme } };

export const Documentation = Template.bind({});
Documentation.parameters = { readme: { content: DocumentationReadme } };
