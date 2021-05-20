import React from 'react';
import { makeDecorator } from '@storybook/addons';
import '../wet-template/themes-dist-4.0.20-theme-gcwu-fegc/theme-gcwu-fegc/css/theme.css';

const addWETTemplate = (storyFn, context) => (
  <div>
    {/* <link rel="stylesheet" href="../wet-template/themes-dist-4.0.20-theme-gcwu-fegc/theme-gcwu-fegc/css/theme.css" /> */}
    <div>test</div>
    {storyFn(context)}
  </div>
);

export default makeDecorator({
  name: 'withWETTemplate',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => addWETTemplate(getStory, context),
});
