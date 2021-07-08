import React from 'react';

import { fireEvent, render, screen } from '../../tests/utilities';
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

  test('should show list of cards', () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['test search'],
      },
    });
    // expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText(/Figure 100/)).toBeInTheDocument();
    // expect(screen.getByText(/testSearch/)).toBeInTheDocument();
    // expect(screen.getByText(/Test1/)).toBeInTheDocument();
    // expect(screen.getByText('api.regions.AB')).toBeInTheDocument();
    // expect(screen.getByText('api.content.TABLE')).toBeInTheDocument();
    // expect(screen.getByText('api.projects.LARGE')).toBeInTheDocument();
    // expect(screen.getByText('api.commodities.OIL')).toBeInTheDocument();
    // expect(screen.getByText('api.statuses.REVOKED')).toBeInTheDocument();
    // expect(screen.getByText(`${formattedDate} - ${formattedDate}`)).toBeInTheDocument();
  });

//   test('chip should be deleted when clicked', () => {
//     render(<ListPanel />, {
//       config: {
//         regions: ['AB'],
//       },
//     });
//     fireEvent.click(screen.getByText('api.regions.AB'));
//     expect(screen.queryByText('api.regions.AB')).toBeNull();
//   });
});
