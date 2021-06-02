import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { storiesOf } from '@storybook/react';

// eslint-disable-next-line react/prop-types
const DocPreview = ({ children }) => (
  <div style={{ padding: '0 40px 40px' }}>
    {children}
  </div>
);

export const storiesForComponent = (name, m, readme, options = {}) => {
  const story = {
    title: name,
    component: m,
    ...options,
  };

  if (readme) {
    if (!story.parameters) {
      story.parameters = {};
    }
    story.parameters.readme = { content: `<!-- STORY -->\n${readme}`, DocPreview };
    story.parameters.docs = {
      source: {
        type: 'auto',
        state: 'open',
      },
    };
  }

  return story;
};

export const storiesForView = (name, m, readme) => {
  let stories = storiesOf(name, m)
    .addParameters({ viewport: { defaultViewport: 'desktop' } });
  if (readme) {
    stories = stories.addParameters({
      readme: { content: `<!-- STORY -->\n${readme}`, DocPreview },
    });
  }
  return stories;
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
