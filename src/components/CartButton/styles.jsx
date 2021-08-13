import { lighten } from '@material-ui/core';

const unavailableColor = '#FFECC9';

export default (theme) => ({
  root: {
    width: '100%',
    padding: '0.7em 1em',
    justifyContent: 'space-between',
    color: theme.palette.cart.dark,
    '&.Mui-disabled': { color: theme.palette.cart.dark },
  },
  add: {
    backgroundColor: theme.palette.cart.light,
    '&:hover': { backgroundColor: lighten(theme.palette.cart.light, 0.5) },
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
