import React from 'react';

import { cleanup, fireEvent, render, screen, waitFor } from '../../tests/utilities';
import CartButton from '.';

describe('Containers/App', () => {
  describe('with a download URL', () => {
    const data = {
      id: '0',
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

      render(<CartButton data={data} />);
      fireEvent.click(screen.getByText('components.cartButton.add'));
      expect(screen.getByText('components.cartButton.remove')).toBeInTheDocument();
    });
  });

  describe('without a download URL', () => {
    const data = {
      id: '0',
      type: 'TABLE',
      url: null,
    };

    it('should render the unavailable state', async () => {
      render(<CartButton data={data} />);

      expect(screen.getByText('components.cartButton.unavailable')).toBeInTheDocument();
    });

    it('should render show additional information on mouse over', async () => {
      render(<CartButton data={data} />);
      fireEvent.mouseOver(screen.getByText('components.cartButton.unavailable'));

      await waitFor(() => {
        expect(screen.getByText('components.cartButton.dataNotice')).toBeInTheDocument();
        expect(screen.getByText('common.learnMethods')).toBeInTheDocument();
      });
    });
  });

  it('should not render component for figure data', () => {
    const figureData = {
      id: '0',
      type: 'FIGURE',
      url: null,
    };
    const { container } = render(<CartButton data={figureData} />);

    expect(container).toBeEmpty();
  });
});
