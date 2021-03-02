const getColor = (x) => {
  // if (x > 80) {
  //   return '#00441b';
  // }
  if (x > 90) {
    return '#006d2c';
  } if (x > 80) {
    return '#238b45';
  }
  if (x > 40) {
    return '#41ab5d';
  } if (x > 30) {
    return '#74c476';
  } if (x > 10) {
    return '#a1d99b';
  } if (x > 5) {
    return '#c7e9c0';
  }
  return '#e5f5e0';
};

export default (data) => {
  const sortedData = data?.sort((a, b) => b.tableCount - a.tableCount);
  if (!sortedData) {
    return null;
  }
  const largestDataPoint = sortedData[0].tableCount;
  // const smallestDataPoint = sortedData[sortedData.length - 1].tableCount;

  const getHSL = (x) => `hsl(102,${(largestDataPoint / x) * 100}%,48%)`;

  const parsedData = sortedData?.reduce((acc, val) => {
    // console.log('largest', largestDataPoint, 'smallest', smallestDataPoint);
    // if (acc.children.length < 3) {
    console.log(val.tableCount / largestDataPoint);
    acc.children.push({ ...val, color: getColor((val.tableCount / largestDataPoint) * 100) });
    // }
    return acc;
  }, { name: 'esaData', children: [] });

  return parsedData;
};

