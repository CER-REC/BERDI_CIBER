import React from 'react';

import { render, screen } from '../../tests/utilities';
import ErrorBoundary from '.';

describe('Components/ErrorBoundary', () => {
  describe('when there is an error', () => {
    let container;
    const problemChildErrorMessage = 'Error thrown from problem child';
    const ProblemChild = () => {
      throw new Error(problemChildErrorMessage);
    };
    const supressProblemChildError = (event) => {
      if (event.message === problemChildErrorMessage) {
        event.preventDefault();
      }
    };

    beforeEach(() => {
      // To keep the error from showing up in our test runner
      window.addEventListener('error', supressProblemChildError);

      container = render(<ErrorBoundary><ProblemChild /></ErrorBoundary>).container;
    });

    afterEach(() => window.removeEventListener('error', supressProblemChildError));

    it('should render the ErrorBoundary', () => {
      expect(container.firstChild).not.toBeEmpty();
    });

    it('should render the error message', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('common.errorMessage');
    });

    it('should render reload links', () => {
      const reloadLinks = [
        document.location.href,
        document.location.href.replace(document.location.search, ''),
      ];
      const links = screen.getAllByRole('link').map((node) => node.href);

      expect(links).toEqual(expect.arrayContaining(reloadLinks));
    });
  });

  describe('when there are no errors', () => {
    const GoodChild = () => <div>I am the good child</div>;

    it('should render the children', () => {
      const { container } = render(<ErrorBoundary><GoodChild /></ErrorBoundary>);
      const { container: goodChildContainer } = render(<GoodChild />);

      expect(container.firstChild).toContainHTML(goodChildContainer.firstChild.outerHTML);
    });
  });
});
