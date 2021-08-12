export default (fileSize) => {
  if (typeof fileSize !== 'number') return null;
  const fileSizeMB = fileSize / 1024;
  return (fileSizeMB >= 1) ? `${fileSizeMB.toFixed(2)} MB` : `${fileSize.toFixed(2)} KB`;
};
