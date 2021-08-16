import { useIntl } from 'react-intl';

export default (fileSize) => {
  if (typeof fileSize !== 'number') return null;

  const intl = useIntl();
  const fileSizeMB = fileSize / 1024;
  return (fileSizeMB >= 1)
    ? `${Number(fileSizeMB.toFixed(2)).toLocaleString(intl.locale)} MB`
    : `${Number(fileSize.toFixed(2)).toLocaleString(intl.locale)} KB`;
};
