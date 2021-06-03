import React from 'react';

import { fireEvent, render, screen } from '../../tests/utilities';
import FilterChipsPanel from '.';

describe('Components/FilterChipsPanel', () => {
  test('should render component', () => {
    const { container } = render(<FilterChipsPanel />, {
      config: {
        searches: ['testSearch'],
      },
    });
    expect(container).not.toBeEmpty();
  });

  test('should show a chip for each filter applied', () => {
    const date = new Date();
    render(<FilterChipsPanel />, {
      config: {
        searches: ['testSearch'],
        applicationIds: ['Application Test 1'],
        regions: ['AB'],
        contentTypes: ['TABLE'],
        projectTypes: ['LARGE'],
        commodities: ['OIL'],
        statuses: ['REVOKED'],
        startDate: date,
        endDate: date,
      },
    });
    const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short' });
    expect(screen.getByText(/testSearch/)).toBeInTheDocument();
    expect(screen.getByText(/Test1/)).toBeInTheDocument();
    expect(screen.getByText('api.regions.AB')).toBeInTheDocument();
    expect(screen.getByText('api.content.TABLE')).toBeInTheDocument();
    expect(screen.getByText('api.projects.LARGE')).toBeInTheDocument();
    expect(screen.getByText('api.commodities.OIL')).toBeInTheDocument();
    expect(screen.getByText('api.statuses.REVOKED')).toBeInTheDocument();
    expect(screen.getByText(`${formattedDate} - ${formattedDate}`)).toBeInTheDocument();
  });

  test('chip should be deleted when clicked', () => {
    render(<FilterChipsPanel />, {
      config: {
        regions: ['AB'],
      },
    });
    const chip = screen.getByText('api.regions.AB').parentNode;
    fireEvent.click(chip);
    expect(chip.toBeEmpty);
  });
});
