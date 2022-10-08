export default (translations) => (
  translations.reduce((i18nMessages, translation) => {
    let key;

    switch (translation.group) {
      case 'REGION':
        key = `api.regions.${translation.key}`;
        break;
      case 'CONTENT_TYPE':
        key = `api.content.${translation.key}`;
        break;
      case 'STATUS':
        key = `api.statuses.${translation.key}`;
        break;
      case 'PROJECT_TYPE':
        key = `api.projects.${translation.key}`;
        break;
      case 'COMMODITY':
        key = `api.commodities.${translation.key}`;
        break;
      case 'NOTICE':
        key = `api.notice.${translation.key}`;
        break;
      default:
        return i18nMessages;
    }

    // eslint-disable-next-line no-param-reassign
    i18nMessages.en[key] = translation.english;
    // eslint-disable-next-line no-param-reassign
    i18nMessages.fr[key] = translation.french;

    return i18nMessages;
  }, { en: {}, fr: {} })
);
