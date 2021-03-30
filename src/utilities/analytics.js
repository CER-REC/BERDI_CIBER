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

const reportSearch = (search) => report('search', 'search', { value: search });

const reportShowFilter = () => report('search', 'filter', { label: 'show' });

const reportFilter = (type, filter) => report('search', 'filter', { label: type, value: filter.toString() });

const reportProject = (regions, commodities, projectTypes, statuses, application) => (
  report('project', 'view', {
    filters: JSON.stringify({ commodities, projectTypes, statuses }),
    label: application,
    value: regions.toString(),
  })
);

const reportSort = (regions, commodities, projectTypes, statuses, applicationNames, type) => (
  report('title', 'sort', {
    filters: JSON.stringify({ commodities, projectTypes, statuses }),
    label: type,
    project: applicationNames.toString(),
    province: regions.toString(),
  })
);

const reportContent = (regions, commodities, projectTypes, statuses, applicationNames, content) => (
  report('title', 'view', {
    filters: JSON.stringify({ commodities, projectTypes, statuses }),
    label: content,
    project: applicationNames.toString(),
    province: regions.toString(),
  })
);

export {
  reportSearch,
  reportSection,
  reportShowFilter,
  reportFilter,
  reportProject,
  reportSort,
  reportContent,
};
