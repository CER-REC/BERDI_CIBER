import fetch from 'node-fetch';
import '@testing-library/jest-dom';

/**
 * global related:
 */
global.fetch = fetch;

// silent warning messages
global.console = { ...global.console, warn: jest.fn() };

// Mock window.open
global.open = jest.fn();
global.location.assign = jest.fn();

/**
 * Fixes a known issue when testing Material UI Tooltip.
 * https://github.com/mui-org/material-ui/issues/15726
 */
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

global.document = global.window.document;
global.window.open = global.open;

// Define is needed to override the location assign function references
Object.defineProperty(global.window, 'location', {
  value: {
    ...global.window.location,
    assign: global.location.assign,
  },
});
