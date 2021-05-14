import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';

import withConfigAndGQL from '../../../.storybook/addon-config-and-gql';

import NavButtons from '.';
import ReadMe from './README.md';

const SEARCH_CONFIG = {
  page: 'search',
  searches: [],
  applicationIds: [],
  regions: [],
  startDate: '2003-03-17T08:00:00.000Z',
  endDate: '2019-04-04T07:00:00.000Z',
  commodities: [],
  projectTypes: [],
  statuses: [],
  contentTypes: [],
  treemapApplicationIds: [],
  searchIndex: 0,
  fragment: '',
};

const LANDING_CONFIG = {
  ...SEARCH_CONFIG,
  page: 'landing',
};

const METHODS_CONFIG = {
  ...SEARCH_CONFIG,
  page: 'methods',
};

storiesForComponent('Components/NavButtons/BackButton', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: SEARCH_CONFIG })
  .addDecorator(withKnobs)
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/LargeButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: LANDING_CONFIG })
  .addDecorator(withKnobs)
  .add('default', () => (
    <NavButtons />
  ));

storiesForComponent('Components/NavButtons/SmallButtons', module, ReadMe)
  .addDecorator(withConfigAndGQL)
  .addParameters({ mockConfigBasic: METHODS_CONFIG })
  .addDecorator(withKnobs)
  .add('default', () => (
    <NavButtons />
  ));
