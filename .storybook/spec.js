import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import { SynchronousPromise } from 'synchronous-promise';

// initStoryshots runs Storybook's configuration and needs "configure" to be called synchronously
global.Promise = SynchronousPromise;

jest.doMock('./addon-status', () => jest.fn((storyFnOuter, contextOuter) => {
  if (typeof storyFnOuter === 'function') { return storyFnOuter(contextOuter); }
  return (storyFn, context) => storyFn(context);
}));

// This fixes an issue with Jest sometimes ignoring the storybook spec, since it
// doesn't directly define a test.
beforeAll(() => {});

// Note that a deprecation warning is shown, this is an issue in @storybook/addon-storyshots
// (https://github.com/storybookjs/storybook/issues/13815)
initStoryshots({
  test: snapshotWithOptions({
    createNodeMock: (element) => {
      const { props } = element;
      // Mock ref for Material UI slider
      if (props.className?.indexOf('MuiSlider-root') !== -1) {
        return document.createElement(element.type);
      }

      return null;
    },
  }),
});
