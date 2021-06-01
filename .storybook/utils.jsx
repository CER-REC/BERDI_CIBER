import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { storiesOf } from '@storybook/react';
import withStatus from './addon-status';

// eslint-disable-next-line react/prop-types
const DocPreview = ({ children }) => (
  <div style={{ padding: '0 40px 40px' }}>
    {children}
  </div>
);

export const newStoriesForComponent = (name, m, readme, options = {}) => {
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
      },
    };
  }

  return story;
};

// TODO: Delete me
export const storiesForComponent = (name, m, readme) => {
  let stories = storiesOf(name, m);
  // .addDecorator(withInfo({ header: false, inline: true }));

  if (readme) {
    stories = stories.addParameters({
      readme: { content: `<!-- STORY -->\n${readme}`, DocPreview },
    });
  }
  // Add withStatus after the Readme, to make sure it groups on the outside
  stories = stories.addDecorator(withStatus);
  return stories;
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

/**
 * This function will update the displayName and props of any components wrapped
 * in a HOC, so that it displays properly in Storybook.
 */
export const fixInfo = (Component) => {
  /* eslint-disable no-param-reassign */
  const { WrappedComponent } = Component;
  if (!WrappedComponent) { return; }
  Component.displayName = WrappedComponent.displayName;
  // eslint-disable-next-line no-underscore-dangle
  Component.__docgenInfo = WrappedComponent.__docgenInfo;
  /* eslint-enable no-param-reassign */
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
