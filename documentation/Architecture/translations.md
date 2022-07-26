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

## Changing Languages

To change the language, use the console and set ```localStorage['dev-lang'] = 'fr``` to view the French version of the application.