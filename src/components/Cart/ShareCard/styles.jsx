export default (theme) => ({
  shareCard: {
    width: '30em',
    position: 'fixed',
    top: '80px',
    right: '0',
    border: '1px solid #C7C7CD',
    zIndex: 1,
    '& button:disabled': {
      ...theme.mixins.disabled,
    },
  },
  closeButton: {
    width: '1em',
    height: '1em',
    fontSize: '10px',
  },
  shareCardCopyButton: {
    backgroundColor: theme.palette.cart.light,
    color: theme.palette.cart.dark,
    width: '100%',
    justifyContent: 'flex-start',
  },
  doneIcon: {
    color: '#669B37',
    fontSize: '30px',
    position: 'relative',
    bottom: '3px',
  },
  shareDisclaimer: {
    fontSize: '11px',
    fontStyle: 'italic',
  },
  shareSnackbar: {
    position: 'absolute',
    bottom: '0.5em',
    color: theme.palette.cart.dark,
    backgroundColor: '#B5C8D3',
    justifyContent: 'center',
    padding: 'unset',
  },
});
