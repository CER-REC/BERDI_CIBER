import React from 'react';
import { act } from 'react-dom/test-utils';

import {
  cleanup,
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

const setURLSearchParams = (search) => {
  window.location.search = search;

  global.app.history.push({
    pathname: global.app.history.location.pathname,
    search,
  });
};

const simulateSearch = () => {
  const searchButton = screen.getByLabelText('components.searchPanel.searchButton');
  const searchField = screen.getByLabelText('components.searchPanel.searchPlaceHolder');
  fireEvent.change(searchField, { target: { value: 'test search' } });
  fireEvent.click(searchButton);
};

const simulateFilter = () => {
  const showFilters = screen.getByText('components.searchPanel.filterLabel').parentNode;
  const showFiltersSwitch = getByRole(showFilters, 'checkbox');

  fireEvent.click(showFiltersSwitch);

  // Wait until the filters are expanded to show the filters block for selection
  const filters = screen.getByLabelText('components.filterPanel.filters');

  // Material UI select component uses the mouse down event
  fireEvent.mouseDown(getByRole(getByText(filters, 'common.project').parentNode, 'button'));
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
  fireEvent.click(showFiltersSwitch);
  fireEvent.click(screen.getByText('common.project'));
};

describe('Containers/App', () => {
  beforeEach(() => {
    const dayMS = 172800000;
    // Certain large numbers will cause the setTimeout in Jest tests to trigger immediately
    const expiry = new Date().getTime() + dayMS;

    sessionStorage.setItem('expiryDate', expiry);
  });

  it('should render component', () => {
    const { container } = render(<LazyApp />, { configMocked: false });

    expect(container).not.toBeEmpty();
  });

  it('should render the legal disclaimer', async () => {
    sessionStorage.setItem('expiryDate', new Date().getTime());
    render(<LazyApp />, { configMocked: false });

    await waitFor(() => expect(screen.getByText('components.legalDisclaimer.attention')).toBeInTheDocument());

    cleanup();

    sessionStorage.setItem('expiryDate', new Date().getTime() + 1000);
    render(<LazyApp />, { configMocked: false });

    await waitFor(() => expect(screen.getByText('components.legalDisclaimer.attention')).toBeInTheDocument());

    cleanup();

    sessionStorage.removeItem('expiryDate');
    render(<LazyApp />, { configMocked: false });

    expect(screen.getByText('components.legalDisclaimer.attention')).toBeInTheDocument();
  });

  it('should set the state from the URL parameters', async () => {
    setURLSearchParams('?page=search&filter=project&searchIndex=2&cartIndex=&startDate=2000-12-01&endDate=2000-12-31&regions=MB&commodities=GAS&projectTypes=ABANDONMENT&statuses=WITHDRAWN&contentTypes=FIGURE,TABLE&topics=&search=ImZpc2gi&applicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDEiXQ%3D%3D&treemapApplicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDIiXQ%3D%3D');
    render(<LazyApp />, { configMocked: false });

    expect(screen.getByText('pages.back', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('fish')).toBeInTheDocument();
    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('api.regions.MB')).toBeInTheDocument();
    expect(screen.getByText('api.content.FIGURE')).toBeInTheDocument();
    expect(screen.getByText('api.content.TABLE')).toBeInTheDocument();
    expect(screen.getByText('api.projects.ABANDONMENT')).toBeInTheDocument();
    expect(screen.getByText('api.commodities.GAS')).toBeInTheDocument();
    expect(screen.getByText('api.statuses.WITHDRAWN')).toBeInTheDocument();
    expect(screen.getByText('Dec 2000 - Dec 2000')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('3').closest('li')).toHaveClass('active');
    });
  });

  it.todo('should set the cart state from the URL parameter');

  // TODO: fix this test after treemap ids are removed
  // it('should push the state to the history', async () => {
  //   const expected = 'page=search&filter=project&searchIndex=1&cartIndex=&resultCount=10&startDate=2000-01-01&endDate=2000-01-31&regions=AB,BC,QC&commodities=OIL&projectTypes=SMALL,LARGE&statuses=APPROVED,REVOKED&contentTypes=TABLE&topics=&search=InRlc3Qgc2VhcmNoIg%3D%3D&applicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDEiXQ%3D%3D&treemapApplicationIds=WyJBcHBsaWNhdGlvbiBUZXN0IDEiXQ%3D%3D';

  //   render(<LazyApp />, { configMocked: false });
  //   simulateSearch();
  //   simulateFilter();

  //   await waitFor(() => {
  //     const next = screen.getByText('common.next');

  //     // Hack to stop navigation not implemented error
  //     // jsdom strictly checks for a null to stop navigation
  //     next.target = null;

  //     fireEvent.click(getByText(screen.getByText('components.treeMapPanel.boxSelect').nextSibling, 'Test1'));
  //     fireEvent.click(next);
  //   });

  //   expect(window.history.pushState).toHaveBeenLastCalledWith(
  //     expect.anything(),
  //     expect.anything(),
  //     expect.stringContaining(expected),
  //   );
  // });

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
    setURLSearchParams('?page=search&searchIndex=&cartIndex=&startDate=2000-01-01&endDate=2000-01-31&regions=&commodities=&projectTypes=&statuses=&contentTypes=&search=IiI%3D&applicationIds=BAD_DATA&treemapApplicationIds=BAD_DATA');
    render(<LazyApp />, { configMocked: false });

    expect(screen.getByText('pages.back', { exact: false })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('cell')).not.toHaveLength(0);
    });
  });

  it('should set the state from the history on back events', async () => {
    render(<LazyApp />, { configMocked: false });
    simulateSearch();

    await act(async () => {
      window.dispatchEvent(new PopStateEvent('popstate'));

      await waitFor(() => {
        expect(screen.getByText('pages.landing.tagline')).toBeInTheDocument();
      });
    });
  });

  it('should save the cart IDs to local storage', async () => {
    render(<LazyApp />, { configMocked: false });
    simulateSearch();
    await waitFor(() => fireEvent.click(getByText(screen.getByText('Available Download Data Test').parentNode.parentNode, 'components.cartButton.add')));
    await waitFor(() => {
      expect(window.localStorage.getItem('cartIds')).toEqual('["3473"]');
      expect(window.localStorage.getItem('unreadCartIds')).toEqual('["3473"]');
    });

    cleanup();

    window.localStorage.setItem('cartIds', '["1","8454","77"]');
    window.localStorage.setItem('unreadCartIds', '["1"]');
    render(<LazyApp />, { configMocked: false });
    simulateSearch();
    await waitFor(() => fireEvent.click(getByText(screen.getByText('Available Download Data Test').parentNode.parentNode, 'components.cartButton.add')));
    await waitFor(() => {
      expect(window.localStorage.getItem('cartIds')).toEqual('["1","8454","77","3473"]');
      expect(window.localStorage.getItem('unreadCartIds')).toEqual('["1","3473"]');
    });
  });

  it('should remove the cart IDs from local storage', async () => {
    window.localStorage.setItem('cartIds', '["3473"]');
    render(<LazyApp />, { configMocked: false });
    simulateSearch();
    await waitFor(() => fireEvent.click(getByText(screen.getByText('Available Download Data Test').parentNode.parentNode, 'components.cartButton.remove')));
    await waitFor(() => {
      expect(window.localStorage.getItem('cartIds')).toEqual('[]');
      expect(window.localStorage.getItem('unreadCartIds')).toEqual('[]');
    });

    cleanup();

    window.localStorage.setItem('cartIds', '["3473","1","77"]');
    window.localStorage.setItem('unreadCartIds', '["3473","77"]');
    render(<LazyApp />, { configMocked: false });
    simulateSearch();
    await waitFor(() => fireEvent.click(getByText(screen.getByText('Available Download Data Test').parentNode.parentNode, 'components.cartButton.remove')));
    await waitFor(() => {
      expect(window.localStorage.getItem('cartIds')).toEqual('["1","77"]');
      expect(window.localStorage.getItem('unreadCartIds')).toEqual('["77"]');
    });
  });

  it('should read the cart IDs from local storage', async () => {
    window.localStorage.setItem('cartIds', '["3473"]');
    render(<LazyApp />, { configMocked: false });
    simulateSearch();

    await waitFor(() => expect(screen.getAllByText('components.cartButton.remove')).not.toHaveLength(0));
  });

  it('should render the methods page when the data unavailable link is clicked', async () => {
    render(<LazyApp />, { configMocked: false });
    simulateSearch();

    await waitFor(() => fireEvent.mouseOver(screen.getAllByText('components.cartButton.unavailable')[0]));
    await waitFor(() => {
      fireEvent.click(getByText(screen.getByRole('tooltip'), 'common.learnMethods'));

      expect(screen.getByText('pages.methods.body.title')).toBeInTheDocument();
    });
  });
});
