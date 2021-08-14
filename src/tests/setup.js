import fetch from 'node-fetch';
import '@testing-library/jest-dom';

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
