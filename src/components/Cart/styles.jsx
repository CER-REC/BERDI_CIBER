export default (theme) => ({
  cartButton: {
    backgroundColor: theme.palette.cart.light,
    position: 'fixed',
    right: 0,
    top: '50%',
    zIndex: 10,
    padding: '10px 10px 5px 0',
    borderRadius: 0,
  },
  newDot: {
    fill: '#D32645',
    strokeWidth: 0,
    position: 'relative',
    left: '40px',
    bottom: '4px',
  },
  newDotHidden: {
    visibility: 'hidden',
  },
  cartButtonLabel: {
    color: theme.palette.cart.dark,
    fontSize: '13px',
    fontWeight: '900',
    margin: '0 5px 0 5px',
    paddingLeft: '5px',
  },
  drawer: {
    width: '30em',
    overflowY: 'unset',
  },
  header: {
    backgroundColor: theme.palette.cart.light,
    borderBottom: '8px solid',
    borderBottomColor: theme.palette.secondary.main,
    padding: '1em 0.5em 0.5em 1.5em',
  },
  headerQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.icon.grey,
  },
  headerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    display: 'none', // TODO: remove this when link is implemented
  },
  headerButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '& svg': {
      color: theme.palette.icon.grey,
    },
  },
  headerButton: {
    width: '50px',
    height: '50px',
  },
  body: {
    height: '100%',
    width: '100%',
  },
  removeButton: {
    margin: '0.85em 0.35em',
    padding: '0 0.5em',
    '&.Mui-focusVisible': { backgroundColor: theme.palette.action.hover },
  },
  removeButtonText: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: '18px',
    color: theme.palette.cart.dark,
  },
  removeButtonIcon: {
    fontSize: '45px',
    color: theme.palette.cart.dark,
    marginRight: '0.25em',
  },
  bodyList: {
    flexGrow: 1,
  },
  bodyListEmpty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerDisabled: {
    ...theme.mixins.disabled,
  },
  footer: {
    borderTop: '8px solid',
    borderTopColor: theme.palette.secondary.main,
    opacity: 1,
    pointerEvents: 'auto',
  },
  footerDisclaimer: {
    backgroundColor: '#F7F7FB',
    margin: '1em',
    padding: '1em',
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: '14px',
  },
});
