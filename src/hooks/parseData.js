const getColor = (darkR, darkG, darkB, lightR, lightG, lightB, percent) => {
  let r = Math.round((darkR - lightR) * percent + darkR);
  let g = Math.round((darkG - lightG) * percent + darkG);
  let b = Math.round((darkB - lightB) * percent + darkB);

  r = (r < 255) ? r : 255;
  g = (g < 255) ? g : 255;
  b = (b < 255) ? b : 255;

  r = (r > 0) ? r : 0;
  g = (g > 0) ? g : 0;
  b = (b > 0) ? b : 0;

  return `rgb(${r}, ${g}, ${b})`;
};

// rgb values
const darkGreen = [99, 180, 64];
const lightGreen = [194, 225, 181];

export default (data) => {
  if (!data) {
    return null;
  }
  const sortedData = data.sort((a, b) => b.tableCount - a.tableCount);
  const largestDataPoint = sortedData[0].tableCount;

  const parsedData = sortedData.reduce((acc, val) => {
    const percentage = (val.tableCount / largestDataPoint);
    const color = getColor(...darkGreen, ...lightGreen, percentage);
    acc.children.push({ ...val, color });
    return acc;
  }, { name: 'esaData', children: [] });

  return parsedData;
};

