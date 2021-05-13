# Containers

`Containers` should be written functional React components.

`Containers` should be stored in `./src/containers/ContainerName/`.

`Containers` **cannot** be rendered more than once.

## Folder Structure

Each `Container` should have a folder in `./src/containers/`, matching the name
and capitalization of the `Container` component. Each `Container` should have its own
supporting documentation, examples, and tests.

```
/* Inside ./src/containers/ContainerName/ */
index.jsx // ContainerName as the default export
styles.js // Styles for ContainerName and children
spec.jsx // Test for ContainerName
stories.jsx // Examples
README.md // Documentation
```

Unlike `Components`, a `Container` may not have any private components within it.
Any functionality it needs for rendering should be imported from a `Component`.

## CSS Classes

- Same as `Components` **CSS Classes**

## PropTypes

PropTypes should be added to props to reduce bugs in component usage.

## Documentation

Each view should have a `README.md` to explain what components are being
used, and what its interaction, analytics, and accessibility requirements are,
with reference links back to the design document.
