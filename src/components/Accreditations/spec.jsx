import React from 'react';
import { render, screen } from '../../tests/utilities';
import Accreditations from '.';

describe('Components/Accreditations', () => {
  test('should render component', async () => {
    const { container } = render(<Accreditations />);

    expect(container).not.toBeEmpty();
  });

  test('should have a title and body', () => {
    render(<Accreditations />);
    expect(screen.getByText('pages.landing.discoveries.accreditations.title')).toBeInTheDocument();
    expect(screen.getByText('pages.landing.discoveries.accreditations.body')).toBeInTheDocument();
  });
});
