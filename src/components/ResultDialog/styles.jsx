export default (theme) => ({
  downloadIcon: {
    overflow: 'visible',
    marginRight: '5px',
    '& img': {
      verticalAlign: 'text-top',
    },
  },
  dialogHeader: {
    '& div': {
      textAlign: 'right',
      marginBottom: '-5px',
    },
    '& button': {
      fill: 'black',
      padding: '10px',
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
  dialogContent: {
    padding: '0 38px',
    marginBottom: '-10px',
  },
  dialogProject: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: '10px',
    width: '100%',
    textAlign: 'left',
  },
  dialogTitle: {
    fontSize: 24,
    paddingRight: '400px',
    fontWeight: '200',
  },
  dialogLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: '15px',
    width: '10%',
    textAlign: 'right',
  },
});
