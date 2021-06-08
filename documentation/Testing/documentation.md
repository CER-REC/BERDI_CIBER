# Documentation

All of our components are documented with a readme and examples that are visible
within this Storybook document.

## Reading the documentation

Components listed at the top level of the `Components` section, and components that exist to organize or
simplify the logic of another component may be nested under its' heading. These
are referred to as `Public` and `Private` components in other parts of the
documentation.

Each component will have a set of stories, which explain the various ways that
it can be used. Each component will have a Docs tab at the top that when clicked will show a readme that explains the purpose of the component and the design and accessibility requirements. 

The docs page will contain a few useful items. 

* Code snippet - To show the correct way to use the component.
* Args(Replaces knobs) - A way to change the props of the component to see how the component will change.

The bottom bar contains panels
that will contain important information for individual stories.

* Interactions - Used on a component's primary story to provide a more
  interactive version of the component, and on other stories as a log of
  interactions that would be handled by the view.
* Knobs(Legacy) - Controls that may be used to modify what properties are passed to a
  story. These are often used in place of full interactions in order to focus on
  an individual property.
* Accessibility - WCAG test results for the story.
* Viewport - Used in the views to test the visualization in different resolutions.

## Documentation Author Usage

When implementing the interaction addon, all stories may use the action tracker,
but please limit your usage of state to a main example story (often
`default` or `basic usage`). The goal of this addon is to give end users a
better understanding of how the component will work, without investing time in
state tracking that will be replaced by Redux in the visualization.

For the main story decorator, the typical usage will be:

TODO: Update code example to new storybook syntax

```jsx
import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MyComponent from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MyComponent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onChange', 'toggleModal'] }))
  .add('basic usage', () => <MyComponent {...getInteractionProps()} />, {
    interaction: {
      // Add full state and interactions for the main demo
      state: { selected: 3, modalOpen: false },
      actions: {
        onChange: () => v => ({ selected: v }),
        toggleModal: state => () => ({ modalOpen: !state.modalOpen }),
      },
    },
  })
  // Other stories set props manually or with knobs, and only use generic actions
  .add('selected', () => <MyComponent selected={1} {...getInteractionProps()} />);
```
