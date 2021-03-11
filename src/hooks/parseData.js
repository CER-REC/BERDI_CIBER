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
  const sortedData = data?.sort((a, b) => b.tableCount - a.tableCount);
  if (!sortedData) {
    return null;
  }
  const largestDataPoint = sortedData[0].tableCount;

  const parsedData = sortedData?.reduce((acc, val) => {
    const percentage = (val.tableCount / largestDataPoint);
    const color = getColor(...darkGreen, ...lightGreen, percentage);
    acc.children.push({ ...val, color });
    return acc;
  }, { shortName: 'esaData', children: [] });

  return parsedData;
};

