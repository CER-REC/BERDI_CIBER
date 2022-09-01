import React from 'react';

import { cleanup, fireEvent, render, screen } from '../../tests/utilities';
import NavButtons from '.';

describe('Components/NavButtons', () => {
  // Landing page navigation buttons
  const expectNavBlockToBeRendered = () => {
    expect(screen.getByText('pages.landing.projectLinkText')).not.toBeEmpty();
    expect(screen.getByText('pages.landing.dataLinkText')).not.toBeEmpty();
    expect(screen.getByText('pages.landing.methodLinkText')).not.toBeEmpty();
    expect(screen.getByText('pages.landing.ikLinkText')).not.toBeEmpty();
    expect(screen.getByText('pages.landing.generalLimitationsText')).not.toBeEmpty();
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

  it('should render the navigation block', () => {
    render(<NavButtons />);
    expectNavBlockToBeRendered();
  });

  it('should render the page navigation buttons', () => {
    render(<NavButtons />, { config: { page: 'project' } });
    expectPageNavigationButtonsToBeRendered();
  });

  it('should render the navigation block after clicking the back button', () => {
    render(<NavButtons />, { config: { page: 'search' } });
    fireEvent.click(screen.getByRole('button'));
    expectNavBlockToBeRendered();
  });

  it('should render the navigation block after clicking the page button', () => {
    render(<NavButtons />);
    fireEvent.click(screen.getByText('pages.landing.projectLinkText'));
    expectPageNavigationButtonsToBeRendered();

    cleanup();

    render(<NavButtons />);
    fireEvent.click(screen.getByText('pages.landing.dataLinkText'));
    expectPageNavigationButtonsToBeRendered();

    cleanup();

    render(<NavButtons />);
    fireEvent.click(screen.getByText('pages.landing.methodLinkText'));
    expectPageNavigationButtonsToBeRendered();
  });
});
