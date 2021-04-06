export default (theme) => ({
  downloadIcon: {
    overflow: 'visible',
    marginRight: '5px',
    '& img': {
      verticalAlign: 'text-top',
    },
  },
  topRight: {
    '& div': {
      textAlign: 'right',
    },
    '& button': {
      fill: 'black',
    },
  },

  dialogFooter: {
    backgroundColor: '#eaf9ff',
    padding: '10px 20px 10px 0',
    '& button': {
      borderRadius: '5px',
      textTransform: 'none',
    },
    '& a': {
      whiteSpace: 'nowrap',
      textDecoration: 'none',
    },
  },
  footerCounts: {
    padding: '0 20px',
    '& span': {
      fontWeight: '900',
    },
  },
  dialogContent: {
    marginBottom: '20px',
    padding: '0 20px',
    '& p > span': {
      fontWeight: '900',
    },
    '& h6': {
      textTransform: 'uppercase',
      fontWeight: 'normal',
      color: '#434343',
    },
  },
  esaSectionTitle: {
    paddingBottom: '0',
    fontWeight: '900',
    marginTop: '20px',
  },
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
  },
  esaSections: {
    paddingTop: '0',
    display: 'inline',
  },
  buttons: {
    '& a': {
      textTransform: 'none',
    },
  },
  pdfLink: {
    color: theme.palette.blue.dark,
    '&:hover, &:visited': { color: theme.palette.blue.dark },
  },
});
