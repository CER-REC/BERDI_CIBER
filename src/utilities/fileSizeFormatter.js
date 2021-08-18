import { useIntl } from 'react-intl';

export default (fileSize) => {
  const intl = useIntl();
  if (typeof fileSize !== 'number') return null;
  const fileSizeMB = fileSize / 1024;
  return (fileSizeMB >= 1)
    ? `${Number(fileSizeMB.toFixed(2)).toLocaleString(intl.locale)} MB`
    : `${Number(fileSize.toFixed(2)).toLocaleString(intl.locale)} KB`;
};
