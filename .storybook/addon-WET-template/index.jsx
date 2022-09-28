import React from 'react';
import { makeDecorator } from '@storybook/addons';

const addWETTemplate = (storyFn, context) => (context.parameters.fileName.toString().includes('components/') ? (
  <>
    <link rel="stylesheet" href="./themes-dist-4.0.20-theme-gcwu-fegc/theme-gcwu-fegc/css/theme.min.css" />
    <style>
      {
        `body {
            background-image: unset !important;
            background-position: unset !important;
            background-repeat: unset !important;
        }`
      }
    </style>
    {storyFn(context)}
  </>
) : storyFn(context));

export default makeDecorator({
  name: 'withWETTemplate',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => addWETTemplate(getStory, context),
});
