import { NEB_ACT_CUTOFF_DATE } from '../constants';

export default (type, filingDate) => {
  const isNEBAct = filingDate.getTime() <= NEB_ACT_CUTOFF_DATE.getTime();

  switch (type) {
    case 'LARGE':
      return isNEBAct
        ? 'components.listPanel.relatedTopics.NEBAct.large'
        : 'components.listPanel.relatedTopics.CERAct.large';

    case 'SMALL':
      return isNEBAct
        ? 'components.listPanel.relatedTopics.NEBAct.small'
        : 'components.listPanel.relatedTopics.CERAct.small';

    case 'ABANDONMENT':
      return isNEBAct
        ? 'components.listPanel.relatedTopics.NEBAct.abandonment'
        : 'components.listPanel.relatedTopics.CERAct.abandonment';

    default:
      return `api.projects.${type}`;
  }
};
