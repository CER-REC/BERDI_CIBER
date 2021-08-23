export default (fileSize, locale) => {
  if (typeof fileSize !== 'number') return null;
  const fileSizeMB = fileSize / 1024;
  return (fileSizeMB >= 1)
    ? `${Number(fileSizeMB.toFixed(2)).toLocaleString(locale)} MB`
    : `${Number(fileSize.toFixed(2)).toLocaleString(locale)} KB`;
};
