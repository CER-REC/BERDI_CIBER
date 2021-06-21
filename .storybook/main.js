module.exports = {
  stories: [
    '../documentation/Introduction/*stories.jsx',
    '../documentation/**/*stories.jsx',
    '../src/**/*stories.jsx',
  ],
  addons: [
    '@storybook/addon-docs',
    'storybook-addon-interaction/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-intl/register',
  ],
};
