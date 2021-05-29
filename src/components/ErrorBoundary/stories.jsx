import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';

import ErrorBoundary from '.';
import ReadMe from './README.md';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

const consoleError = console.error;

// To keep the error from showing up in our test runner
console.error = (...args) => {
  if (args[0].includes('The above error occurred in the <ProblemChild> component:')) {
    return;
  }

  consoleError(...args);
};

storiesForComponent('Components/ErrorBoundary', module, ReadMe)
  .add('default', () => (
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  ));
