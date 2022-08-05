import React from 'react';
import HighLevelReadMe from './highLevel.md';
import ComponentsReadMe from './components.md';
import ContainersReadMe from './containers.md';
import TranslationsReadMe from './translations.md';
import PDFViewerReadMe from './pdfViewer.md';

export default {
  title: 'Documentation/Architecture',
  component: module,
};

const Template = () => <></>;

export const HighLevel = Template.bind({});
HighLevel.parameters = { readme: { content: HighLevelReadMe } };

export const Components = Template.bind({});
Components.parameters = { readme: { content: ComponentsReadMe } };

export const Containers = Template.bind({});
Containers.parameters = { readme: { content: ContainersReadMe } };

export const Translations = Template.bind({});
Translations.parameters = { readme: { content: TranslationsReadMe } };

export const PDFViewer = Template.bind({});
PDFViewer.parameters = { readme: { content: PDFViewerReadMe } };
