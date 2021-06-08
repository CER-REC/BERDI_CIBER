import React from 'react';
import AccuracyAlert from '.';
import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

export default storiesForComponent('Components/AccuracyAlert', module, ReadMe, { decorators: [withConfigAndGQL] });
export const Primary = () => <AccuracyAlert />;
