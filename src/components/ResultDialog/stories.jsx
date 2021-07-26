import React from 'react';
import { useArgs } from '@storybook/client-api';
import { storiesForComponent } from '../../../.storybook/utils';
import ResultDialog from '.';
import ReadMe from './README.md';

const data = {
  title: 'title',
  url: 'https://url.ca',
  pdfName: 'pdfName',
  pdfURL: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  pageNumber: 111,
  pageCount: 999,
  project: 'projectName',
  esaFolderURL: 'https://esaFolderURL.ca',
  projectFolderURL: 'https://projectFolderURL.ca',
  finalDecisionURL: 'https://finalDecisionURL.ca',
  application: {
    name: 'test name',
  },
};

export default storiesForComponent(
  'Components/ResultDialog',
  module,
  ReadMe,
);

const Template = (args) => {
  const updateArgs = useArgs()[1];
  const onClose = () => updateArgs({ open: false });
  return <ResultDialog {...args} onClose={onClose} />;
};

export const Primary = Template.bind({});
Primary.args = {
  open: false,
  data,
};
