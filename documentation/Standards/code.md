# Code

## Linting

All code should be linted with ESLint and the Vizworx customized AirBnB React configuration, so that
we have a consist style across components. This can be linted locally by an
integration with your IDE, or by running `npm run lint`. It will also be
automatically linted when a pull request is created.

If a linting rule needs to be ignored, use this order of priority:

1. Only one or two lines
```js
// eslint-disable-next-line no-console
console.log('test');
```
2. Multiple lines in a section
```js
/* eslint-disable no-console */
console.log('test0');
console.log('test1');
console.log('test2');
/* eslint-enable no-console */
```
3. Whole file (avoid if possible)
```js
// At the top of the file
/* eslint-disable no-console */
```

## Naming Convention

* Components should be PascalCase (`MyComponentName`, also known as upper camel
case or title case)
* Functions should be camelCase (`myFunctionName`)
* No-operation functions should be referred to as noop (`const noop = () => {};`)
* Variables should be camelCase (`myVariableName`)
* Variables should not start with an underscore. Variables and class properties
should be viewed as private, with the only public scope being React props or
exports
