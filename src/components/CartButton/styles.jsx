import { lighten } from '@material-ui/core';

export default (theme) => ({
  root: {
    width: '100%',
    padding: '0.7em 1em',
    marginTop: '0.5em',
    justifyContent: 'left',
    color: theme.palette.cart.dark,
    fontSize: '1.375rem',
    '& img': {
      marginRight: '0.5em',
    },
  },
  add: {
    backgroundColor: theme.palette.cart.light,
    '&:hover': { backgroundColor: lighten(theme.palette.cart.light, 0.5) },
  },
  remove: { backgroundColor: '#DEDEE1' },
});
