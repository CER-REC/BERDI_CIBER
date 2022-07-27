import { lighten } from '@material-ui/core';

export default (theme) => ({
  root: {
    width: '100%',
    padding: '0.7em 1em',
    marginTop: '0.5em',
    justifyContent: 'space-between',
    color: theme.palette.cart.dark,
    '&.Mui-disabled': { color: theme.palette.cart.dark },
  },
  add: {
    backgroundColor: theme.palette.cart.light,
    '&:hover': { backgroundColor: lighten(theme.palette.cart.light, 0.5) },
  },
  remove: { backgroundColor: '#DEDEE1' },
});
