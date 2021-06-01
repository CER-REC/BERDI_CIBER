import React from 'react';
import IconCheckbox from '.';
import { newStoriesForComponent } from '../../../.storybook/utils';

export default newStoriesForComponent('Components/IconCheckbox', module, '');

export const Primary = () => <IconCheckbox checked={false} />;
