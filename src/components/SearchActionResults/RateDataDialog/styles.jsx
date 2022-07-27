export default (theme) => ({
  titleSection: {
    backgroundColor: theme.palette.teal.blue,
    color: 'white',
    padding: '0 1em 0 2em',
    '& h6': {
      paddingBottom: '0.5em',
    },
    '& button': {
      color: 'white',
    },
  },
  body: {
    '& label': {
      fontWeight: 'normal',
      padding: '0.3em 0 0 0',
      '& input': {
        marginRight: '0.3em',
      },
    },
  },
  button: {
    backgroundColor: theme.palette.teal.blue,
    color: 'white',
    padding: '0.4em 2em',
    '&:hover': {
      backgroundColor: theme.palette.teal.blue,
    },
  },
  disabledButton: {
    backgroundColor: '#A1A3A5',
    '&.Mui-disabled': {
      color: 'white',
    },
    padding: '0.4em 2em',
  },
  submitted: {
    '& h6:first-of-type': {
      fontWeight: '700',
      paddingTop: '2em',
      paddingBottom: '0.5em',
    },
  },
  imageSection: {
    textAlign: 'center',
    paddingTop: '3em',
    paddingBottom: '2em',
  },
  bottomText: {
    paddingBottom: '2em',
    fontSize: '14px',
    fontStyle: 'italic',
  },
});
