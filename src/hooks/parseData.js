const getColor = (r, g, b, lightR, lightG, lightB, percent) => {
  let r2 = Math.round(lightR - Math.abs(r - lightR) * percent);
  let g2 = Math.round(lightG - Math.abs(g - lightG) * percent);
  let b2 = Math.round(lightB - Math.abs(b - lightB) * percent);
  r2 = (r2 < 255) ? r2 : 255;
  g2 = (g2 < 255) ? g2 : 255;
  b2 = (b2 < 255) ? b2 : 255;
  r2 = (r2 > 0) ? r2 : 0;
  g2 = (g2 > 0) ? g2 : 0;
  b2 = (b2 > 0) ? b2 : 0;
  return `rgb(${r2}, ${g2}, ${b2})`;
};

// rgb values
const darkGreen = [99, 180, 64];
const lightGreen = [194, 225, 181];

export default (data) => {
  if (!data?.length) {
    return null;
  }
  const sortedData = data.sort(
    (a, b) => (b.tableCount + b.figureCount) - (a.tableCount + a.figureCount),
  );
  const largestDataPoint = sortedData[0].tableCount + sortedData[0].figureCount;

  const parsedData = sortedData.reduce((acc, val) => {
    const totalCount = val.tableCount + val.figureCount;
    const percentage = (totalCount / largestDataPoint);
    const color = getColor(...darkGreen, ...lightGreen, percentage);

    acc.tableCount += val.tableCount;
    acc.figureCount += val.figureCount;
    acc.children.push({ ...val, color, totalCount });
    return acc;
  }, { shortName: 'esaData', tableCount: 0, figureCount: 0, children: [] });

  return parsedData;
};

