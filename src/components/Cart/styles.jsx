export default (theme) => ({
  cartButton: {
    backgroundColor: theme.palette.cart.light,
    position: 'fixed',
    right: 0,
    top: '50%',
    zIndex: '1',
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
    width: '28em',
  },
  closeButton: {
    textAlign: 'right',
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
    color: '#42464B',
  },
  body: {
    borderBottom: '8px solid',
    borderBottomColor: theme.palette.secondary.main,
    overflowY: 'auto',
    height: '100%',
  },
  footerDisabled: {
    opacity: 0.25,
    pointerEvents: 'none',
  },
  footer: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  footerDisclaimer: {
    backgroundColor: '#F7F7FB',
    margin: '1em',
    padding: '1em',
    textAlign: 'center',
  },
  footerDisclaimerText: {
    fontSize: '13px',
  },
  footerDownloadButton: {
    marginBottom: '2em',
    backgroundColor: theme.palette.cart.dark,
    padding: '0.3em 3em',
  },
  footerDownloadButtonIcon: {
    overflow: 'visible',
    paddingRight: '0.5em',
    maxWidth: '1.2em',
  },
});
