import React from 'react';
import { render, screen, fireEvent } from '../../tests/utilities';
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

  test('should stop rendering the loading spinner when the PDF is loaded', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    fireEvent.load(screen.getByText('components.resultDialog.failedToLoad').closest('object'));
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('should render the PDF on the provided page', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    const pdfObject = screen.getByText('components.resultDialog.failedToLoad').closest('object');
    expect(pdfObject.getAttribute('data')).toContain(data.pdfURL);
    expect(pdfObject.getAttribute('data')).toContain(`page=${data.pageNumber}`);
  });
});
