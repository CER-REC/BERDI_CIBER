import React from 'react';
import { render, screen } from '../../tests/utilities';
import ResultDialog from '.';

const data = {
  title: 'Table 1234 and Related Tables',
  url: 'https://url.ca',
  pdfName: 'Table 1234',
  pdfURL: 'https://pdfURL.ca',
  pageNumber: 111,
  pageCount: 999,
  project: 'projectName',
  esaFolderURL: 'https://esaFolderURL.ca',
  projectFolderURL: 'https://projectFolderURL.ca',
  finalDecisionURL: 'https://finalDecisionURL.ca',
};

const noop = () => { };

describe('Components/ResultDialog', () => {
  test('should render component', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('loading spinner should be present', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('data fields should be present', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    expect(screen.getByText(data.project)).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(`${data.pageNumber} of ${data.pageCount}`)).toBeInTheDocument();
    expect(screen.getByText(data.esaFolderURL)).toHaveAttribute('href', data.esaFolderURL);
    expect(screen.getByText(data.projectFolderURL)).toHaveAttribute('href', data.projectFolderURL);
    expect(screen.getByText(data.finalDecisionURL)).toHaveAttribute('href', data.finalDecisionURL);
  });

  test('download button should not be present if there is no url', () => {
    render(<ResultDialog open onClose={noop} data={{ title: 'noURLTitle' }} />);
    expect(screen.queryByText('components.resultDialog.downloadTable')).not.toBeInTheDocument();
  });

  test('component should not be present when open is false', () => {
    render(<ResultDialog open={false} onClose={noop} data={data} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // TODO: revise if granularity around final decision url states is decided upon
  test('should show pending when finalDecisionURL is blank', () => {
    render(<ResultDialog open onClose={noop} data={{ title: 'noFinalDecisionURL' }} />);
    expect(screen.queryByText('components.resultDialog.pending')).toBeInTheDocument();
  });

  // TODO: test hiding the loading indicator when pdf is loaded

  // TODO: test which page the pdf loads in at (should be target page)
});
