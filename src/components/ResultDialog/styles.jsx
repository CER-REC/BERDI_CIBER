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
    width: '100%',
  },
  dialogFooterButtons: {
    width: '20%',
    '& button': {
      borderRadius: '5px',
      width: '100%',
    },
    '& a, a:hover, a:visited, a:active': {
      textDecoration: 'none',
      fontSize: 15,
    },
  },
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
    paddingLeft: '1em',
  },
  dialog: {
    height: '90%',
  },
  dialogContent: {
    padding: '0 38px',
    marginBottom: '-10px',
    '& a, a:hover, a:visited, a:active': {
      color: 'inherit',
    },
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
    paddingRight: '350px',
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
