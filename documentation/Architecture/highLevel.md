# High Level Architecture

## Material-UI

We are using the [React Material-UI](https://material-ui.com/) framework.
Any elements or utility functions should be imported from `Material-UI` first,
before adding other external packages.

## Components and Containers

We use the terms `Components` and `Containers`, despite both implementing the
React component pattern, so that we can differentiate between reusable elements
and non-reusable elements. Both of these implement a similar pattern,
with the primary difference being reuse.

Although we use the term `Containers`, we are **not** following the [Container Component Architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw).
Both `Components` and `Containers` can reference external state variables.

## Documentation

High-level documentation (like this architecture documentation) belongs in
`./documentation/`.

## Hooks

- Avoid using `useCallback` and `useMemo`, unless required to stop re-renders and improve performance
- Custom hooks belong in `./hooks/` and should begin with `use`
- Shared component state can be updated and retrieved from the `useConfig` hook
  ```js
  const { config, configDispatch } = useConfig();

  const state = config.state;

  configDispatch({ type: 'state/changed', payload: 'NEW_STATE' });
  ```
- Stories of components referencing `useConfig` or GraphQL data hooks can use the `addon-config-and-gql` decorator
  - Any required config state values can be set in the parameters property of the options object and specifying the state in a `config` object
  - GraphQL API results are mocked in `./src/tests/mocks` (same as the tests)
  - The initial config state values will always be set on load if not specified within the parameters object
    ```js
    import React from 'react';

    import { storiesForComponent } from '../../../.storybook/utils';
    import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';
    import Component from '.';
    import ReadMe from './README.md';

    export default storiesForComponent(
      'Components/Component', 
      module, 
      ReadMe, 
      {
        decorators: [withConfigAndGQL],
        parameters: {
          config: { value1: 1, value2: 2 },
        }
      },
    );

    export const Primary = () => <Component />;
    ```
  - The **App** story does not use the `addon-config-and-gql` decorator as it will connect to the API specified in `.env`
- Dispatched actions should only contain 2 properties
  - **type**
    - The ID of the action
    - Comprised of the affected state areas and ending with the event operation
    - Formatted as lower camel cased items and separated with forward slashes
    - `examples/added`
  - **payload**
    - The values required for the state update
    - Can be `undefined`

## Testing

Every component should have a set of tests to ensure that it renders as designed
and covers all of the interaction, analytics, and accessibility requirements.

## Retrieving data

Data for the visualization will be served by a GraphQL server running in the IIS
visualization service. Queries can be executed with `@apollo/react-hooks`, which will
provide automatic caching and query execution when props change.
