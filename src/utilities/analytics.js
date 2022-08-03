import Cookies from 'js-cookie';
import { v1 } from 'uuid';

const dataLayer = window.dataLayer || [];
let userId = Cookies.get('esa-UUID');

if (!window.dataLayer) {
  // eslint-disable-next-line no-console
  console.warn('Google Tag Manager dataLayer not found.');
}

if (!userId) {
  userId = v1();

  Cookies.set('esa-UUID', userId);
}

const report = (category, action, data) => {
  if (!category || !action) {
    // eslint-disable-next-line no-console
    console.warn('Missing analytics category or action');

    return;
  }

  const event = {
    event: 'esa databank interaction',
    category,
    action,
    userID: userId,
    ...(data || {}),
  };

  dataLayer.push(event);
};

const reportSection = (page) => report('section', 'click', { value: page });

const reportDisclaimer = () => report('disclaimer', 'click', { value: 'Read Our Disclaimer' });

const reportSearch = (search) => report('search', 'search', { value: search });

const reportShowFilter = () => report('search', 'filter', { label: 'show' });

const reportFilter = (type, value, checked) => (
  report(type, 'filter', { label: value, value: (checked ? 'check' : 'uncheck') })
);

const reportProject = (application) => report('project', 'view', { label: 'project name', value: application });

const reportContent = (content) => report('title', 'view', { label: content });

const reportDownload = (name) => report('TABLE', 'Download', { value: name });

const reportView = (type, name) => report(type, 'View', { value: name });

const reportAddTopicFilter = (topic) => report('circleclassification', 'click', { value: topic });

const reportRemoveTopicFilter = (topic) => report('circleclassification', 'unclick', { value: topic });

const reportChip = (name) => report('keywordtags', 'click', { value: name });

const reportFilterToggle = (filter) => report('toggle', 'click', { value: filter });

const reportDetails = (name) => report('details', 'click', { value: name });

const reportReportData = () => report('details', 'click', { value: 'reportdata' });

const reportExpand = () => report('navbutton', 'click', { value: 'Expand' });

const reportCollapse = () => report('navbutton', 'click', { value: 'Collapse' });

const reportCartDownload = () => report('download', 'click', { value: 'downloadalltable' });

const reportCartOpen = () => report('shelf', 'click', { value: 'open' });

const reportCartAdd = (name) => report('shelf', 'add to shelf', { value: name });

const reportCartRemove = (name) => report('shelf', 'remove from shelf', { value: name });

const reportCartShare = () => report('shelf', 'click', { value: 'share' });

const reportCartRemoveAll = () => report('shelf', 'click', { value: 'removeall' });

const reportSearchHelp = () => report('searchhelp', 'click', { value: 'searchhelp' });

export {
  reportSearch,
  reportSection,
  reportDisclaimer,
  reportShowFilter,
  reportFilter,
  reportProject,
  reportContent,
  reportDownload,
  reportView,
  reportAddTopicFilter,
  reportRemoveTopicFilter,
  reportChip,
  reportFilterToggle,
  reportDetails,
  reportReportData,
  reportExpand,
  reportCollapse,
  reportCartDownload,
  reportCartOpen,
  reportCartAdd,
  reportCartRemove,
  reportCartShare,
  reportCartRemoveAll,
  reportSearchHelp,
};
