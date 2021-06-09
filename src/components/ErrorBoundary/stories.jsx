import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ErrorBoundary from '.';
import ReadMe from './README.md';

// To keep the error from showing up in our test runner
const consoleError = console.error;
console.error = () => {};

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

export default storiesForComponent('Components/ErrorBoundary', module, ReadMe);

export const Primary = () => (
  <ErrorBoundary>
    <ProblemChild />
  </ErrorBoundary>
);

console.error = consoleError;
