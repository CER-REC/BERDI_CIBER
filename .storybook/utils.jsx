import React from 'react';
import { makeDecorator } from '@storybook/addons';

// eslint-disable-next-line react/prop-types
const DocPreview = ({ children }) => (
  <div style={{ padding: '0 40px 40px' }}>
    <br />
    {children}
  </div>
);

export const storiesForComponent = (name, m, readme, options = {}) => {
  const story = {
    title: name,
    component: m,
    parameters: {},
    ...options,
  };

  if (readme) {
    story.parameters.readme = { content: `<!-- STORY -->\n${readme}`, DocPreview };
  }
  story.parameters.docs = {
    source: {
      type: 'auto',
      state: 'open',
    },
  };

  return story;
};

export const storiesForContainer = (name, m, readme, options = {}) => {
  const story = storiesForComponent(name, m, readme, options);
  story.parameters.viewport = { defaultViewport: 'desktop' };

  return story;
};

export const withStyles = makeDecorator({
  name: 'withStyles',
  parameterName: 'styles',
  allowDeprecatedUsage: false,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const styles = (`${options || ''}\n${parameters || ''}`).trim();
    if (!styles) { return getStory(context); }

    return (
      <>
        {getStory(context)}
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </>
    );
  },
});
