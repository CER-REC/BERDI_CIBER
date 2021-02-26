export default (translations) => (
  translations.reduce((i18nMessages, translation) => {
    let key;

    switch (translation.group) {
      case 'REGION':
        key = `common.regions.${translation.key}`;
        break;
      case 'CONTENT_TYPE':
        key = `common.content.${translation.key}`;
        break;
      case 'STATUS':
        key = `common.statuses.${translation.key}`;
        break;
      case 'PROJECT_TYPE':
        key = `common.projects.${translation.key}`;
        break;
      case 'COMMODITY':
        key = `common.commodities.${translation.key}`;
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
