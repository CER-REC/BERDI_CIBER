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

// Define is needed to override the location assign function references
Object.defineProperty(global, 'location', {
  value: {
    ...global.location,
    assign: jest.fn(),
  },
});
