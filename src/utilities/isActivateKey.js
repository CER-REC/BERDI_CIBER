export default (event) => {
  if ((event.key === ' ') || (event.key === 'Enter')) {
    event.preventDefault();
    return true;
  }

  return false;
};
