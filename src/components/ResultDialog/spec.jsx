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
    expect(screen.getByText(`${data.project}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.title}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.pageNumber} of ${data.pageCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.esaFolderURL}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.projectFolderURL}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.finalDecisionURL}`)).toBeInTheDocument();
  });

  test('download button should not be present if there is no url', () => {
    const { queryByTestId } = render(<ResultDialog open onClose={noop} />);
    expect(queryByTestId('downloadButton')).not.toBeInTheDocument();
  });
});
