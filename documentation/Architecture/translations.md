# Translations

Internationalization is implemented with the [React Intl](https://github.com/yahoo/react-intl)
library.

## Language JSON

The JSON files are structured hierarchically and found in `./src/languages/`.

```json
{
  "common": {
    "item1": {
      "subItem1": "Item 1",
      "subItem2": "Item 2",
    },
    "item2": {
      "subItem1": "Item - 1"
    }
  }
}
```

The JSON files are later flatten at runtime with dot separated key names.
The dot separated key name is the ID of the language translation message.

```json
{
  "common.item1.subItem1": "Item 1",
  "common.item1.subItem2": "Item 2",
  "common.item2.subItem1": "Item - 1",
}
```

- Translation items should be grouped under:
  - `common` for shared translations
  - `components.[lowerCamelCasedComponentName]` for component specific translations
  - `containers.[lowerCamelCasedContainerName]` for container specific translations
- Use [React Intl](https://formatjs.io/docs/react-intl/api) to format dates, times, and numbers for different regions

## API Translations

Translations that come from the backend API can be pulled in with `useAPI` and are formatted with `getI18NMessages()`.

API translations can be overridden by making an entry with the same identifier in the language JSON files.

Any translations that come from the backend will be prefaced with `api`.

Listed below is a list of the current translations coming from the API:

```json
​​{
"api.commodities.GAS": "Gas",
​​
"api.commodities.OIL": "Oil",
​​
"api.content.FIGURE": "Figure",
​​
"api.content.TABLE": "Table",
​​
"api.projects.ABANDONMENT": "Pipeline Abandonment",
​​
"api.projects.LARGE": "Large Projects (over 40 km)",
​​
"api.projects.SMALL": "Small Projects (under 40 km)",
​​
"api.regions.AB": "Alberta",
​​
"api.regions.BC": "British Columbia",
​​
"api.regions.MB": "Manitoba",
​​
"api.regions.NB": "New Brunswick",
​​
"api.regions.NS": "Nova Scotia",
​​
"api.regions.NT": "Northwest Territories",
​​
"api.regions.ON": "Ontario",
​​
"api.regions.QC": "Quebec",
​​
"api.regions.SK": "Saskatchewan",
​​
"api.keywords.community": "community",
​​
"api.keywords.emissions": "emissions",
​​
"api.keywords.fish": "fish",
​​
"api.keywords.health": "health",
​​
"api.keywords.plants": "plants",
​​
"api.keywords.risk": "risk",
​​
"api.statuses.ABANDONMENT_PENDING": "Abandonment Pending",
​​
"api.statuses.APPLIED": "Applied",
​​
"api.statuses.APPROVED": "Approved",
​​
"api.statuses.OPERATING": "Operating",
​​
"api.statuses.RESCINDED": "Rescinded Certificates",
​​
"api.statuses.REVOKED": "Revoked Certificate",
​​
"api.statuses.WITHDRAWN": "Withdrawn"
​}

```

## Usage with Hooks

```js
import React from 'react';
import { useIntl } from 'react-intl';

const Component = () => {
  const intl = useIntl();

  return (
    <span>{intl.formatMessage({ id: 'components.Component.message' })}<span/>
  );
};

export default Component;
```

## Storybook

**TODO: Update**

If the component uses the API method (with injectIntl), then the Story Source in Storybook for the
component will render `<InjectIntl(Component) />` instead of `<Component />`. Calling the `fixInfo`
function in `stories.jsx` will fix this issue.

```js
...
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
...
fixInfo(Component);
...
storiesForComponent('Components|Component', module, ReadMe)
...
```

## Tests

**TODO: Update**

The `ShallowWrapper` object has been updated with a `shallowWithIntl` method, which is needed to
render `FormattedMessage` components in testing. `shallowWithIntl` accepts a object with the
translation IDs as the keys and the translation text as the values. If no object is provided, the
rendered translation cannot be guaranteed.

```js
...
const translationWrapper = wrapper.find('FormattedMessage').shallowWithIntl();
// translationWrapper.html() = '<span class="component">any translation</span>'
expect(translationWrapper.hasClass('component')).toBe(true);
...
```

```js
...
const messages = { 'component.translation': 'specific translation' };
const translationWrapper = wrapper.find('FormattedMessage').shallowWithIntl(messages);
// translationWrapper.html() = '<span class="component">specific translation</span>'
expect(translationWrapper.hasClass('component')).toBe(true);
expect(translationWrapper.text()).toContain('specific translation');
...
```

If the component uses the API method (with injectIntl), then it will need to be rendered with the
`shallowWithIntl` function from test utilities.

```js
import { shallowWithIntl } from '../../tests/utilities';
...
wrapper = shallowWithIntl(<Component />);
...
```
