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
    event: 'visualization event',
    event_visualization: 'esa databank interaction',
    event_subvisualization: undefined,
    event_category: category,
    event_action: action,
    event_value: undefined,
    event_label: undefined,
    event_path: undefined,
    event_language: undefined,
    event_userID: userId,
    event_count: undefined,
    event_doccount: undefined,
    event_hittimestamp: undefined,
    event_hitcount: undefined,
    ...(data || {}),
  };
  dataLayer.push(event);
};

const reportPageView = () => {
  setTimeout(() => {
    window.dataLayer.push({
      event: 'virtualPageview',
      pageURL: window.location.href,
      pageTitle: window.document.title,
    });
  }, 0);
};

const reportSection = (page) => report('section', 'click', { event_value: page });

const reportSectionLinks = () => report('section', 'links', { event_label: 'section links' });

const reportDisclaimer = () => report('disclaimer', 'click', { event_value: 'Read Our Disclaimer' });

const reportSearch = (search) => report('search', 'search', { event_value: search });

const reportShowFilter = () => report('search', 'filter', { event_value: 'show' });

const reportClearFilter = () => report('search', 'filter', { event_value: 'clear filter' });

const reportFilter = (type, value, checked) => (
  report(type, 'filter', { event_value: value, event_label: (checked ? 'check' : 'uncheck') })
);

const reportProject = (application) => report('project', 'view', { event_label: 'project name', event_value: application });

const reportTreemap = (application) => report('project', 'view', { event_label: 'results', event_value: application });

const reportContent = (content) => report('title', 'view', { event_label: content });

const reportDownload = (name) => report('TABLE', 'Download', { event_value: name });

const reportView = (type, name) => report(type, 'View', { event_value: name });

const reportAddTopicFilter = (topic) => report('circleclassification', 'click', { event_value: topic });

const reportRemoveTopicFilter = (topic) => report('circleclassification', 'unclick', { event_value: topic });

const reportChip = (name) => report('keywordtags', 'click', { event_value: name });

const reportFilterToggle = (filter) => report('toggle', 'click', { event_value: filter });

const reportDetails = (name) => report('details', 'click', { event_value: name });

const reportReportData = () => report('details', 'click', { event_value: 'reportdata' });

const reportReportRelated = (topic) => report('details', 'related', { event_label: topic });

const reportReportRelatedDetails = (topic) => report('details', 'relateddetails', { event_label: topic });

const reportExpand = () => report('navbutton', 'click', { event_value: 'Expand' });

const reportCollapse = () => report('navbutton', 'click', { event_value: 'Collapse' });

const reportCartDownload = () => report('download', 'click', { event_value: 'downloadalltable' });

const reportCartOpen = () => report('shelf', 'click', { event_value: 'open' });

const reportCartAdd = (name) => report('shelf', 'add to shelf', { event_value: name });

const reportCartRemove = (name) => report('shelf', 'remove from shelf', { event_value: name });

const reportCartShare = () => report('shelf', 'click', { event_value: 'share' });

const reportCartRemoveAll = () => report('shelf', 'click', { event_value: 'removeall' });

const reportSearchHelp = () => report('searchhelp', 'click', { event_value: 'searchhelp' });

export {
  reportPageView,
  reportSearch,
  reportSectionLinks,
  reportSection,
  reportDisclaimer,
  reportShowFilter,
  reportClearFilter,
  reportFilter,
  reportProject,
  reportTreemap,
  reportContent,
  reportDownload,
  reportView,
  reportAddTopicFilter,
  reportRemoveTopicFilter,
  reportChip,
  reportFilterToggle,
  reportDetails,
  reportReportData,
  reportReportRelated,
  reportReportRelatedDetails,
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
