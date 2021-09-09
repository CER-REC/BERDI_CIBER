export default (fileSize, intl) => {
  if (typeof fileSize !== 'number') return null;
  const fileSizeMB = fileSize / 1024;
  return (fileSizeMB >= 1)
    ? `${Number(fileSizeMB.toFixed(2)).toLocaleString(intl.locale)} ${intl.formatMessage({ id: 'common.megabytes' })}`
    : `${Number(fileSize.toFixed(2)).toLocaleString(intl.locale)} ${intl.formatMessage({ id: 'common.kilobytes' })}`;
};
