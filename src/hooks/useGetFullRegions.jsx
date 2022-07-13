import { useIntl } from 'react-intl';

export default () => {
  const intl = useIntl();

  const getFullRegions = (regions) => regions.map(
    (item) => intl.formatMessage({ id: `api.regions.${item}` }),
  )
    .sort()
    .join(', ');

  return getFullRegions;
};
