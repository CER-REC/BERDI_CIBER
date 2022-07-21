export default (theme) => ({
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
    padding: '0 40px 15px 0',
    justifyContent: 'flex-end',
    width: '100%',
    height: '8%',
  },
  seeMoreButton: {
    color: theme.palette.blue.dark,
    fontWeight: '900',
    fontFamily: theme.typography.fontFamily,
    verticalAlign: 'unset',
    paddingLeft: '1em',
  },
  dialog: {
    height: '95%',
  },
  dialogContent: {
    padding: '0 38px',
    marginBottom: '-10px',
    '& a, a:hover, a:active': {
      color: 'inherit',
    },
  },
  dialogProject: {
    fontSize: 16,
    paddingTop: '10px',
    width: '100%',
    textAlign: 'left',
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: '200',
  },
  dialogLabel: {
    fontSize: 16,
    marginRight: '15px',
  },
  external: {
    marginLeft: '3px',
    marginRight: '2em',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});
