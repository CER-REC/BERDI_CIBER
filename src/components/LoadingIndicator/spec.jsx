import React from 'react';

import { render, screen } from '../../tests/utilities';
import LoadingIndicator from '.';

describe('Components/LoadingIndicator', () => {
  test('should render component', () => {
    const { container } = render(<LoadingIndicator type="api" />);

    expect(container).not.toBeEmpty();
  });

  test('should render the API loading message', () => {
    render(<LoadingIndicator type="api" />);
    expect(screen.getByRole('heading')).toHaveTextContent('components.loadingIndicator.api');
  });

  test('should render the application loading message', () => {
    render(<LoadingIndicator type="app" />);
    expect(screen.getByRole('heading')).toHaveTextContent('components.loadingIndicator.app');
  });

  test('should render with the full screen height', () => {
    const { container } = render(<LoadingIndicator type="api" fullHeight />);

    expect(container.firstChild).toHaveStyle({ height: '100vh' });
  });
});
