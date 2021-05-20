import React from 'react';
import { getRendered, mountWithIntl } from '../../tests/utilities';
import AccuracyAlert from '.';

describe('Components/AccuracyAlert', () => {
  test('should render component', async () => {
    const wrapper = mountWithIntl(<AccuracyAlert />);

    expect(getRendered(AccuracyAlert, wrapper).exists()).toBeTruthy();
  });
});
