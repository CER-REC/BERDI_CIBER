import React from 'react';
import { render } from '../../tests/utilities';
import Cart from '.';

describe('Components/Cart', () => {
  test('should render component', () => {
    const { container } = render(<Cart />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
