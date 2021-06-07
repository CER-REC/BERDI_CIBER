import React from 'react';
import { getRendered, mountWithIntl } from '../../tests/utilities';
import Accreditations from '.';

describe('Components/Accreditations', () => {
  test('should render component', async () => {
    const wrapper = mountWithIntl(<Accreditations />);

    expect(getRendered(Accreditations, wrapper).exists()).toBeTruthy();
  });
});
