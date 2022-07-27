import React from 'react';

import { cleanup, fireEvent, render, screen } from '../../tests/utilities';
import CartButton from '.';

describe('Containers/App', () => {
  describe('with a download URL', () => {
    const data = {
      id: '0',
      title: 'Test',
      type: 'TABLE',
      url: 'http://test',
    };

    it('should render component', () => {
      render(<CartButton data={data} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render the add state', () => {
      render(<CartButton data={data} />);
      expect(screen.getByText('components.cartButton.add')).toBeInTheDocument();

      cleanup();

      render(<CartButton data={data} />, { config: { cartIds: ['0'] } });
      fireEvent.click(screen.getByText('components.cartButton.remove'));
      expect(screen.getByText('components.cartButton.add')).toBeInTheDocument();
    });

    it('should render the remove state', () => {
      render(<CartButton data={data} />, { config: { cartIds: ['0'] } });
      expect(screen.getByText('components.cartButton.remove')).toBeInTheDocument();

      cleanup();

      render(<CartButton data={data} />, { config: { cartIds: [] } });
      fireEvent.click(screen.getByText('components.cartButton.add'));
      expect(screen.getByText('components.cartButton.remove')).toBeInTheDocument();
    });
  });
});
