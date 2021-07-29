import React from 'react';
import { useArgs } from '@storybook/client-api';
import { storiesForComponent } from '../../../.storybook/utils';
import ResultDialog from '.';
import ReadMe from './README.md';

const data = {
  application: {
    name: 'applicationName',
    applicationURL: 'https://applicationURL.ca',
    finalDecisionURL: 'https://finalDecisionURL.ca',
  },
  title: 'Title',
  url: 'https://url.ca',
  pdfName: 'pdfName',
  pdfURL: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  pdfPageNumber: 111,
  esaFolderURL: 'https://esaFolderURL.ca',
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
