import React from 'react';
import GitReadme from './git.md';
import CodeReadme from './code.md';

export default {
  title: 'Documentation/Standards',
  component: module,
};

const Template = () => <></>;

export const Git = Template.bind({});
Git.parameters = { readme: { content: GitReadme } };

export const Code = Template.bind({});
Code.parameters = { readme: { content: CodeReadme } };
