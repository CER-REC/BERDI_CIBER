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

const reportDiscovery = (name) => report('discovery', 'click', { value: name });

const reportSearch = (search) => report('search', 'search', { value: search });

const reportShowFilter = () => report('search', 'filter', { label: 'show' });

const reportFilter = (type, value, checked) => (
  report(type, 'filter', { label: value, value: (checked ? 'check' : 'uncheck') })
);

const reportProject = (application) => report('project', 'view', { label: application });

const reportContent = (content) => report('title', 'view', { label: content });

const reportDownload = (name) => report('TABLE', 'Download', { value: name });

const reportView = (type, name) => report(type, 'View', { value: name });

export {
  reportSearch,
  reportSection,
  reportDisclaimer,
  reportDiscovery,
  reportShowFilter,
  reportFilter,
  reportProject,
  reportContent,
  reportDownload,
  reportView,
};
