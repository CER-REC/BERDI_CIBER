import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ErrorBoundary from '.';
import ReadMe from './README.md';

const problemChildErrorMessage = 'Error thrown from problem child';
const ProblemChild = () => {
  throw new Error(problemChildErrorMessage);
};
const supressProblemChildError = (event) => {
  if (event?.message?.includes(problemChildErrorMessage)) {
    event.preventDefault();
  }
};
const consoleError = console.error;

// To keep the error from showing up in our test runner
console.error = (...args) => {
  if (args[0]?.includes && args[0]?.includes('The above error occurred in the <ProblemChild> component:')) {
    return;
  }

  consoleError(...args);
};

// Ignores the inner problem child error
window.addEventListener('error', supressProblemChildError);

export default storiesForComponent('Components/ErrorBoundary', module, ReadMe);

export const Primary = () => (
  <ErrorBoundary>
    <ProblemChild />
  </ErrorBoundary>
);
