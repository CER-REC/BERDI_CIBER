import React from 'react';
import { act } from 'react-dom/test-utils';

import {
  getAllByRole,
  getByRole,
  getByText,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../tests/utilities';
// Index renders the app in the Apollo and Intl providers which are mocked for tests
import LazyApp from './lazy';

const simulateSearch = () => {
  const search = screen.getByText('components.searchPanel.searchButton');

  fireEvent.change(getByRole(search.closest('div'), 'textbox'), { target: { value: 'test search' } });
  fireEvent.click(search);
};

const simulateFilter = () => {
  fireEvent.click(getByRole(screen.getByText('components.searchPanel.filterLabel').parentNode, 'checkbox'));
  // Material UI select component uses the mouse down event
  fireEvent.mouseDown(getByRole(screen.getByText('components.dropdown.APPLICATION_NAMES').parentNode, 'button'));
  fireEvent.click(screen.getByText('Test1'));
  fireEvent.click(screen.getByRole('presentation').firstChild);
  fireEvent.mouseDown(getByRole(screen.getByText('components.dropdown.REGIONS').parentNode, 'button'));
  fireEvent.click(screen.getByText('api.regions.AB'));
  fireEvent.click(screen.getByText('api.regions.BC'));
  fireEvent.click(screen.getByText('api.regions.QC'));
  fireEvent.click(screen.getByRole('presentation').firstChild);
  fireEvent.mouseDown(getByRole(screen.getByText('components.dropdown.CONTENT_TYPES').parentNode, 'button'));
  fireEvent.click(screen.getByText('api.content.TABLE'));
  fireEvent.click(screen.getByRole('presentation').firstChild);
  fireEvent.mouseDown(getByRole(screen.getByText('components.dropdown.PROJECT_TYPES').parentNode, 'button'));
  fireEvent.click(screen.getByText('api.projects.SMALL'));
  fireEvent.click(screen.getByText('api.projects.LARGE'));
  fireEvent.click(screen.getByRole('presentation').firstChild);
  fireEvent.mouseDown(getByRole(screen.getByText('components.dropdown.COMMODITIES').parentNode, 'button'));
  fireEvent.click(screen.getByText('api.commodities.OIL'));
  fireEvent.click(screen.getByRole('presentation').firstChild);
  fireEvent.mouseDown(getByRole(screen.getByText('components.dropdown.STATUSES').parentNode, 'button'));
  fireEvent.click(screen.getByText('api.statuses.APPROVED'));
  fireEvent.click(screen.getByText('api.statuses.REVOKED'));
  fireEvent.click(screen.getByRole('presentation').firstChild);
  fireEvent.click(getByRole(screen.getByText('components.dropdown.dateLabel').parentNode, 'button'));
  fireEvent.keyDown(getAllByRole(screen.getByRole('presentation'), 'slider')[1], { key: 'Home' });
  fireEvent.click(screen.getByRole('presentation').firstChild);
};

describe('Containers/App', () => {
  afterEach(() => {
    window.location.search = '';
  });

  it('should render component', () => {
    const { container } = render(<LazyApp />, { configMocked: false });

    expect(container).not.toBeEmpty();
  });

  it('should set the state from the URL parameters', async () => {
    window.location.search = '?page=search&searchIndex=2&cartIndex=&startDate=2000-12-01&endDate=2000-12-31&regions=MB&commodities=GAS&projectTypes=ABANDONMENT&statuses=WITHDRAWN&contentTypes=FIGURE,TABLE&search=ImZpc2gi&applicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDEiXQ%3D%3D&treemapApplicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDIiXQ%3D%3D';

    render(<LazyApp />, { configMocked: false });

    expect(screen.getByText('pages.back', { exact: false })).not.toBeEmpty();
    expect(screen.getByText('fish')).not.toBeEmpty();
    expect(screen.getByText('Test1')).not.toBeEmpty();
    expect(screen.getByText('api.regions.MB')).not.toBeEmpty();
    expect(screen.getByText('api.content.FIGURE')).not.toBeEmpty();
    expect(screen.getByText('api.content.TABLE')).not.toBeEmpty();
    expect(screen.getByText('api.projects.ABANDONMENT')).not.toBeEmpty();
    expect(screen.getByText('api.commodities.GAS')).not.toBeEmpty();
    expect(screen.getByText('api.statuses.WITHDRAWN')).not.toBeEmpty();
    expect(screen.getByText('Dec 2000 - Dec 2000')).not.toBeEmpty();

    await waitFor(() => {
      expect(getByText(screen.getByText('components.applications.title').parentNode, 'Test2')).not.toBeEmpty();
      expect(screen.getByText('3').closest('li')).toHaveClass('active');
    });
  });

  it.todo('should set the cart state from the URL parameter');

  it('should push the state to the history', async () => {
    const expected = 'page=search&searchIndex=1&cartIndex=&startDate=2000-01-01&endDate=2000-01-31&regions=AB,BC,QC&commodities=OIL&projectTypes=LARGE,SMALL&statuses=APPROVED,REVOKED&contentTypes=TABLE&search=InRlc3Qgc2VhcmNoIg%3D%3D&applicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDEiXQ%3D%3D&treemapApplicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDEiXQ%3D%3D';

    render(<LazyApp />, { configMocked: false });
    simulateSearch();
    simulateFilter();

    await waitFor(() => {
      const next = screen.getByText('common.next');

      // Hack to stop navigation not implemented error
      // jsdom strictly checks for a null to stop navigation
      next.target = null;

      fireEvent.click(getByText(screen.getByText('components.treeMapPanel.boxSelect').nextSibling, 'Test1'));
      fireEvent.click(next);
    });

    expect(window.history.pushState).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining(expected),
    );
  });

  it('should push the state to the history ignoring bad config values', async () => {
    // Using BigInt to mock a bad config state for throwing a error when setting data in URL
    // eslint-disable-next-line no-undef
    render(<LazyApp />, { config: { search: BigInt('1') } });
    fireEvent.click(screen.getByText('pages.project.title'));

    expect(window.history.pushState).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('page=project'),
    );
  });

  it('should set the state ignoring bad URL parameters', async () => {
    window.location.search = '?page=search&searchIndex=&cartIndex=&startDate=2000-01-01&endDate=2000-01-31&regions=&commodities=&projectTypes=&statuses=&contentTypes=&search=IiI%3D&applicationIds=BAD_DATA&treemapApplicationIds=BAD_DATA';

    render(<LazyApp />, { configMocked: false });

    expect(screen.getByText('pages.back', { exact: false })).not.toBeEmpty();

    await waitFor(() => {
      expect(screen.getAllByRole('cell')).not.toHaveLength(0);
    });
  });

  it('should set the hash from the state fragment', () => {
    render(<LazyApp />, { configMocked: false });
    fireEvent.click(screen.getByText('components.betaAlert.link'));

    expect(window.history.pushState).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('#learn'),
    );
  });

  it('should set the state from the history on back events', async () => {
    render(<LazyApp />, { configMocked: false });
    simulateSearch();

    await act(async () => {
      window.dispatchEvent(new PopStateEvent('popstate'));

      await waitFor(() => {
        expect(screen.getByText('pages.landing.tagline')).not.toBeEmpty();
        expect(screen.getByText('components.searchPanel.exploreLabel')).not.toBeEmpty();
      });
    });
  });

  it.todo('should save the content IDs to local storage');
});
