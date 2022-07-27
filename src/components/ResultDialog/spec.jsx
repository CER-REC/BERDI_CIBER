import React from 'react';
import { render, screen, fireEvent } from '../../tests/utilities';
import ResultDialog from '.';

const data = {
  application: {
    name: 'applicationName',
    applicationURL: 'https://applicationURL.ca',
    finalDecisionURL: 'https://finalDecisionURL.ca',
  },
  id: '0',
  type: 'TABLE',
  title: 'Title',
  url: 'https://url.ca',
  pdfName: 'pdfName',
  pdfURL: 'https://pdfURL.ca',
  pdfPageNumber: 111,
  esaFolderURL: 'https://esaFolderURL.ca',
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

  test('cart button should be present', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    expect(screen.getByText('components.cartButton.add')).toBeInTheDocument();
  });

  test('data fields should be present', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.pdfPageNumber)).toBeInTheDocument();
    expect(screen.getByText('components.resultDialog.originalPDF')).toHaveAttribute('href', data.pdfURL);
    expect(screen.getByText('components.resultDialog.esaFolder')).toHaveAttribute('href', data.esaFolderURL);
    expect(screen.getByText('components.resultDialog.projectFolder')).toHaveAttribute('href', data.application.applicationURL);
    expect(screen.getByText('components.resultDialog.viewFinalDecision')).toHaveAttribute('href', data.application.finalDecisionURL);
  });

  test('download button should not be present if there is no url', () => {
    render(<ResultDialog open onClose={noop} data={{ id: '0', type: 'FIGURE', title: 'noURL', application: { name: 'name' } }} />);
    expect(screen.queryByText('components.resultDialog.downloadTable')).not.toBeInTheDocument();
  });

  test('component should not be present when open is false', () => {
    render(<ResultDialog open={false} onClose={noop} data={data} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should show not applicable when finalDecisionURL is blank', () => {
    render(<ResultDialog open onClose={noop} data={{ id: '0', type: 'FIGURE', title: 'noFinalDecisionURL', application: { name: 'name' } }} />);
    expect(screen.queryByText('components.resultDialog.finalDecisionNotApplicable')).toBeInTheDocument();
  });

  test('should show pending when finalDecisionURL is pending', () => {
    render(<ResultDialog open onClose={noop} data={{ id: '0', type: 'FIGURE', title: 'pendingFinalDecisionURL', application: { name: 'name', finalDecisionURL: 'pending' } }} />);
    expect(screen.queryByText('components.resultDialog.finalDecisionPending')).toBeInTheDocument();
  });

  test('should stop rendering the loading spinner when the PDF is loaded', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    fireEvent.load(screen.getByRole('document'));
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('should render the PDF on the provided page', () => {
    render(<ResultDialog open onClose={noop} data={data} />);
    const pdfObject = screen.getByRole('document');
    expect(pdfObject.getAttribute('data')).toContain(data.pdfURL);
    expect(pdfObject.getAttribute('data')).toContain(`page=${data.pdfPageNumber}`);
  });
});
