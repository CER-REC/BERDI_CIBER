import fetch from 'node-fetch';
import { createBrowserHistory } from 'history';
import '@testing-library/jest-dom';

jest.mock('history', () => {
  const actual = jest.requireActual('history');
  // Use a single history object so the tests can mock the URL
  const appHistory = actual.createBrowserHistory();

  return {
    ...actual,
    // Override createBrowserHistory to always return the same history object
    createBrowserHistory: () => appHistory,
  };
});

global.app = { history: createBrowserHistory() };
// silent warning messages
global.console = { ...global.console, warn: jest.fn() };

/**
 * global related:
 */
global.fetch = fetch;
global.open = jest.fn();
global.scrollTo = jest.fn();

// Responsive nivo charts rely on the getBoundingClientRect sizes to render
HTMLElement.prototype.getBoundingClientRect = () => ({
  width: 100,
  height: 100,
  top: 0,
  left: 0,
});

HTMLElement.prototype.scrollIntoView = jest.fn();

// Define is needed to override the location assign function references
Object.defineProperty(global, 'location', {
  value: {
    ...global.location,
    assign: jest.fn(),
  },
});

jest.spyOn(global.history, 'pushState');
jest.setTimeout(10000);

afterEach(() => {
  window.location.search = '';

  window.localStorage.clear();
  window.sessionStorage.clear();
  global.app.history.push({
    pathname: global.app.history.location.pathname,
    search: window.location.search,
    hash: '',
  });
});
