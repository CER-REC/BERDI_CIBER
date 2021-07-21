import React from 'react';
import { fireEvent, render, screen, waitFor } from '../../tests/utilities';
import ListPanel from '.';

describe('Components/ListPanel', () => {
  test('should render component', () => {
    const { container } = render(<ListPanel />, {
      config: {
        searches: ['testSearch'],
      },
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  it('should show list of 3 cards', async () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['testSearch'],
      },
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Example figure/).length).toBe(3);
    });
  });

  // it('should open and close a dialog when clicked', async () => {
  //   render(<ListPanel />, {
  //     config: {
  //       page: 'search',
  //       searches: ['testSearch'],
  //     },
  //   });
  //   await waitFor(() => {
  //     const heading = screen.getAllByRole('heading')[0];
  //     fireEvent.click(heading);
  //     expect(screen.getByRole('dialog')).not.toBeNull();

  //     const closeButton = screen.getByLabelText('close');
  //     fireEvent.click(closeButton);
  //   });
  //   await waitFor(() => {
  //     expect(screen.queryByLabelText('resultDialog')).toBeNull();
  //   });
  // });
});
