import React from 'react';
import { fireEvent, render, screen, waitFor } from '../../tests/utilities';
import ListPanel from '.';
import mockData from '../../tests/mocks/data.json';
import getProjectTypeLabel from '../../utilities/getProjectTypeLabel';

describe('Components/ListPanel', () => {
  test('should render component', () => {
    const { container } = render(<ListPanel />, {
      config: {
        searches: ['testSearch'],
      },
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  it('should show list cards', async () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['testSearch'],
      },
    });

    await waitFor(() => {
      const { contents } = mockData.data.contentSearch;

      expect(screen.getAllByLabelText('content card').length).toBe(contents.length); // There are two sub rows in each parent row
      expect(screen.getAllByText('components.cartButton.add')).not.toHaveLength(0);

      contents.forEach((content, index) => {
        const result = screen.getAllByLabelText('content card')[index].textContent;
        expect(result).toContain(content.title.substring(0, 150));
        expect(result).toContain(content.application.shortName);
        expect(result).toContain(content.application.companyName);
      });
    });
  });

  it('should render a see more button for long titles', async () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['testSearch'],
      },
    });

    await waitFor(() => {
      const seeMoreButtons = screen.getAllByText('components.resultDialog.seeMore');
      expect(seeMoreButtons.length).toBeGreaterThanOrEqual(1);

      fireEvent.click(seeMoreButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getAllByText('components.resultDialog.seeLess').length).toBe(1);
    });
  });

  it('should open and close a dialog when clicked', async () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['testSearch'],
      },
    });

    await waitFor(() => {
      const heading = screen.getAllByRole('heading')[0];
      fireEvent.click(heading);
      expect(screen.getByRole('dialog')).not.toBeNull();

      const closeButton = screen.getByLabelText('close');
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByLabelText('resultDialog')).toBeNull();
    });
  });

  it('should display more information when viewMore button is clicked', async () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['testSearch'],
      },
    });

    await waitFor(() => {
      const { contents } = mockData.data.contentSearch;
      const viewMoreButtons = screen.getAllByText('components.listPanel.viewMore');
      contents.forEach((content, index) => {
        fireEvent.click(viewMoreButtons[index]);
      });
    });

    await waitFor(() => {
      const { contents } = mockData.data.contentSearch;
      contents.forEach((content, index) => {
        const result = screen.getAllByLabelText('content card')[index].textContent;

        expect(result).toContain(content.title.substring(0, 150));
        expect(result).toContain(content.application.shortName);
        expect(result).toContain(content.application.companyName);
        const regions = content.application.regions.map((item) => `api.regions.${item}`).sort().join(', ');
        expect(result).toContain(regions);
        expect(result).toContain(content.application.consultants);
        expect(result).toContain(new Date(content.application.filingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
        expect(result).toContain(`api.statuses.${content.application.status}`);
        expect(result).toContain(
          getProjectTypeLabel(content.application.type, new Date(content.application.filingDate)),
        );
        expect(result).toContain(`api.commodities.${content.application.commodity}`);
        expect(result).toContain(content.application.hearingOrder);
        expect(screen.getAllByText('components.listPanel.projectLinks').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('components.listPanel.relatedTopics.title').length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it('should expand and collapse all when expandAll button is clicked', async () => {
    render(<ListPanel />, {
      config: {
        page: 'search',
        searches: ['testSearch'],
      },
    });

    await waitFor(() => {
      const { contents } = mockData.data.contentSearch;

      // Expect all to be collapsed by default
      expect(screen.getAllByText('components.listPanel.viewMore').length).toBe(contents.length);
      expect(screen.queryAllByText('components.listPanel.viewFewer').length).toBe(0);

      fireEvent.click(screen.getByText('components.listPanel.expandAll'));
    });

    await waitFor(() => {
      const { contents } = mockData.data.contentSearch;

      // Expect all to be expanded
      expect(screen.getAllByText('components.listPanel.viewFewer').length).toBe(contents.length);
      expect(screen.queryAllByText('components.listPanel.viewMore').length).toBe(0);

      fireEvent.click(screen.getByText('components.listPanel.collapseAll'));
    });

    await waitFor(() => {
      const { contents } = mockData.data.contentSearch;

      // Expect all to be collapsed again
      expect(screen.getAllByText('components.listPanel.viewMore').length).toBe(contents.length);
      expect(screen.queryAllByText('components.listPanel.viewFewer').length).toBe(0);
    });
  });
});
