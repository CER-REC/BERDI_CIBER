import { lighten } from '@material-ui/core';

const textColor = '#07456B';
const addColor = '#D2EDEB';
const unavailableColor = '#FFECC9';

export default (theme) => ({
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
  tooltip: {
    backgroundColor: unavailableColor,
    boxShadow: '1px 1px 4px 2px rgba(0, 0, 0, 0.1)',
    color: theme.palette.primary.main,
    padding: '2em',
    fontStyle: 'italic',
    '& p, button': {
      fontStyle: 'italic',
      lineHeight: 'normal',
      fontSize: 12,
    },
  },
});
