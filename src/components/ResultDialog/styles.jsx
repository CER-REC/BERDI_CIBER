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
    padding: '0 40px 10px 0',
    justifyContent: 'flex-end',
    '& button': {
      borderRadius: '5px',
      textTransform: 'none',
    },
    '& a': {
      whiteSpace: 'nowrap',
      textDecoration: 'none',
    },
  },
  dialogContent: {
    padding: '0 20px',
    '& h6': {
      textTransform: 'uppercase',
      fontWeight: 'normal',
      color: '#434343',
      paddingRight: '40px',
    },
  },
  previewData: {
    backgroundColor: '#EDEDED',
    margin: '0 20px 20px 20px',
    border: '2px dashed black',
    textAlign: 'center',
    padding: '5% 0',
    '& strong': {
      fontWeight: '700',
    },
    '& p': {
      fontStyle: 'italic',
    },
  },
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
    paddingLeft: '1em',
  },
  buttons: {
    '& a': {
      textTransform: 'none',
    },
  },
  pdfLink: {
    '&:not(:hover):not(:visited)': { color: theme.palette.blue.dark },
  },
  dialog: {
    height: '90%',
  },
  itemTitle: {
    fontSize: 24,
    paddingRight: '250px',
    fontWeight: '200',
  },
  dialogLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: '30px',
  },
});
