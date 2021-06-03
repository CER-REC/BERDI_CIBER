import React from 'react';
import { render } from '../../tests/utilities';
import Accreditations from '.';

describe('Components/Accreditations', () => {
  test('should render component', async () => {
    const { container } = render(<Accreditations />);

    expect(container).not.toBeEmpty();
  });
});
