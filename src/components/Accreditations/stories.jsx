import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Accreditations from '.';
import ReadMe from './README.md';

export default storiesForComponent('Components/Accreditations', module, ReadMe);
export const Primary = () => <Accreditations />;
