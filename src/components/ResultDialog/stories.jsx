import React from 'react';
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
};

export default storiesForComponent(
  'Components/ResultDialog',
  module,
  ReadMe,
  {
    parameters: { options: { showPanel: false } },
  },
);

const onClose = () => { };

const Template = (args) => <ResultDialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
  onClose,
  data,
};

export const Loading = Template.bind();
Loading.args = {
  open: true,
  onClose,
  data: {
    ...data,
    pdfURL: 'https://fakeURL',
  },
};

export const FailedToLoad = Template.bind();
FailedToLoad.args = {
  open: true,
  onClose,
  data: {
    ...data,
    pdfURL: 'fakeURL',
  },
};
