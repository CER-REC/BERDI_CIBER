# Components

`Components` should be written functional React components.

`Components` should be stored in `./src/components/ComponentName/`.

`Components` must be reusable, if another render of the same React component will break functionality,
then this React component should be a `Container`.

## Public vs Private components

Any component that is used by a `Container`, or by two or more other components should
have its own folder and be considered a `Public` component. Anything that is
only used by a single component should be placed in a subfolder of that component, and
is treated as an `Private` component.

Private components should be refactored into a Public component, if we ever
need to use them in more than one component. Private components should be the deepest
path item, and should not have their own subcomponents.

Public components should be treated like a semantically versioned API, and a PR
should mention any time that the component's properties are changed in a way
that might affect other components.

## Folder Structure

Each `Public` component should have a folder in `./src/components/`, matching the name
and capitalization of the component. Each component should have its own supporting
documentation, examples, and tests.

```
/* Inside ./src/components/MyPublicComponent/ */
index.jsx // MyPublicComponent as the default export
styles.js // Styles for MyPublicComponent and children
spec.jsx // Test for MyPublicComponent
stories.jsx // Examples
README.md // Documentation
PrivateComponent/index.jsx // Component used only within MyPublicComponent
PrivateComponent/styles.js // Styles for PrivateComponent and children
PrivateComponent/spec.jsx // Test for PrivateComponent
PrivateComponent/stories.jsx // Examples
PrivateComponent/README.md // Documentation
```

The name used for imports and exports should always match the folder or filename:

* `./MyPublicComponent/index.jsx`
 * Default export is a component named `MyPublicComponent`
 * Imported as `import MyPublicComponent from './src/components/MyPublicComponent';`
* `./MyPublicComponent/PrivateComponent/index.jsx`
 * Default export is a component named `PrivateComponent`
 * Imported as `import PrivateComponent from './PrivateComponent';`

## State

There are three areas where we may track the current visualization settings:

* `useConfig` hook (Global application state)
* Component state
* Component properties

As a general rule, the following steps will define the best location:

* If this data affects sharing the application URL: `useConfig` hook
* If this data is used by multiple components that aren't parents/children of each other: `useConfig` hook
* If this component or its children should rerender when it changes
 * If this data changes multiple times per second: Potentially property that debounces to state
  * Caution should be used, as this may result in race conditions and render bugs. Always discuss this with the team first
* Otherwise: Component state

## CSS Classes

- CSS classes should be implemented using the [Material-UI makeStyles API](https://material-ui.com/styles/advanced/#makestyles)
- If the styles are extracted out of the component index file, the file name should be `styles.js`
- Classes under a component should only be used by that component
- 0 sizes should be referenced directly as `0` without units
- Hex colors should be all caps
- Commonly used style values should be kept as variables in `./src/containers/App/theme.js`
- Note that all 3 methods of overriding the Material-UI CSS classes are acceptable
  - [Pseudo-classes](https://material-ui.com/customization/components/#pseudo-classes)
  - [$ruleName](https://material-ui.com/customization/components/#use-rulename-to-reference-a-local-rule-within-the-same-style-sheet)
  - Referencing the Material-UI CSS class directly (ex. `.Mui-disabled`)
  - Refer to a Material-UI component APIs for a list of applicable rules (ex. [Button](https://material-ui.com/api/button/#css))

```js
/* ./src/components/Component/styles.js */
export default (theme) => ({
  root: {
    position: 'absolute',
    right: 0,
    top: 0,
    '& h1': { fontWeight: 'bold' },
  },
  className: { backgroundColor: '#AA0011' },
});
```

```js
/* ./src/components/Component/index.jsx */
import React from 'react';
import { makeStyles } from '@material-ui/core';

import styles from './styles';

const useStyles = makeStyles(styles);

const Component = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Component</h1>
      <span className={classes.className}>1</span>
      <span>2</span>
      <span className={classes.className}>3</span>
    </div>
  );
};
```

## PropTypes

PropTypes should be added to props to reduce bugs in component usage.

## Documentation

Each component should have a `README.md` to explain what the component is used
for, and what its interaction, analytics, and accessibility requirements are,
with reference links back to the design document.
