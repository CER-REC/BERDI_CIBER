import { lighten } from '@material-ui/core';

const textColor = '#07456B';
const addColor = '#D2EDEB';
const unavailableColor = '#FFECC9';

export default () => ({
  root: {
    width: '100%',
    padding: '0.7em 1em',
    justifyContent: 'space-between',
    color: textColor,
    '&.Mui-disabled': { color: textColor },
  },
  add: {
    backgroundColor: addColor,
    '&:hover': { backgroundColor: lighten(addColor, 0.5) },
  },
  remove: { backgroundColor: '#DEDEE1' },
  unavailable: { backgroundColor: unavailableColor },
});
