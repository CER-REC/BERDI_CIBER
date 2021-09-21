import React from 'react';

import { cleanup, fireEvent, render, screen } from '../../tests/utilities';
import NavButtons from '.';

describe('Components/NavButtons', () => {
  // Landing page navigation buttons
  const expectPageContentButtonsToBeRendered = () => {
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('pages.project.title').closest('button'))
      .toHaveTextContent('pages.project.description');
    expect(screen.getByText('pages.data.title').closest('button'))
      .toHaveTextContent('pages.data.description');
    expect(screen.getByText('pages.methods.title').closest('button'))
      .toHaveTextContent('pages.methods.description');
  };

  const expectPageNavigationButtonsToBeRendered = () => {
    // Content page navigation buttons
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('pages.project.title')).not.toBeEmpty();
    expect(screen.getByText('pages.data.title')).not.toBeEmpty();
    expect(screen.getByText('pages.methods.title')).not.toBeEmpty();
  };

  it('should render component', () => {
    const { container } = render(<NavButtons />);

    expect(container).not.toBeEmpty();
  });

  it('should render the back button', () => {
    render(<NavButtons />, { config: { page: 'search' } });

    expect(screen.getByRole('button')).toHaveTextContent('pages.back');
  });

  it('should render the page content buttons', () => {
    render(<NavButtons />);
    expectPageContentButtonsToBeRendered();
  });

  it('should render the page navigation buttons', () => {
    render(<NavButtons />, { config: { page: 'project' } });
    expectPageNavigationButtonsToBeRendered();
  });

  it('should render the page content buttons after clicking the back button', () => {
    render(<NavButtons />, { config: { page: 'search' } });
    fireEvent.click(screen.getByRole('button'));
    expectPageContentButtonsToBeRendered();
  });

  it('should render the page navigation buttons after clicking the page button', () => {
    render(<NavButtons />);
    fireEvent.click(screen.getByText('pages.project.title'));
    expectPageNavigationButtonsToBeRendered();

    cleanup();

    render(<NavButtons />);
    fireEvent.click(screen.getByText('pages.data.title'));
    expectPageNavigationButtonsToBeRendered();

    cleanup();

    render(<NavButtons />);
    fireEvent.click(screen.getByText('pages.methods.title'));
    expectPageNavigationButtonsToBeRendered();
  });
});
