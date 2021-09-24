export default (number, max) => {
  if (number === 0) {
    return 0;
  }

  const percentage = number / max;

  if (percentage > 0.67) {
    return 3;
  }

  if (percentage > 0.33) {
    return 2;
  }

  return 1;
};
