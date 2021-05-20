import React from 'react';
import { makeDecorator } from '@storybook/addons';

const addWETTemplate = (storyFn, context) => (context.parameters.fileName.includes('components/') ? (
  <>
    <link rel="stylesheet" href="./themes-dist-4.0.20-theme-gcwu-fegc/theme-gcwu-fegc/css/theme.min.css" />
    <link rel="stylesheet" href="./overrides.css" />
    {storyFn(context)}
  </>
) : storyFn(context));

export default makeDecorator({
  name: 'withWETTemplate',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => addWETTemplate(getStory, context),
});
