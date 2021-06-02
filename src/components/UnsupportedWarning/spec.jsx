import React from 'react';

import { render } from '../../tests/utilities';
import UnsupportedWarning from '.';

describe('Components/UnsupportedWarning', () => {
  it('should render component', () => {
    const { container } = render(<UnsupportedWarning type="resolution" />);

    expect(container).not.toBeEmpty();
  });

  it('should render the resolution unsupported message', () => {
    const { container } = render(<UnsupportedWarning type="resolution" />);

    expect(container.firstChild).toHaveTextContent('components.unsupportedWarning.resolution');
  });

  it('should render the browser unsupported message', () => {
    const { container } = render(<UnsupportedWarning type="browser" />);

    expect(container.firstChild).toHaveTextContent('components.unsupportedWarning.browser');
  });
});
