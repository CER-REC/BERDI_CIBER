export default {
  titleSection: {
    backgroundColor: '#07456B',
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
    backgroundColor: '#07456B',
    color: 'white',
    padding: '0.4em 2em',
    '&:hover': {
      backgroundColor: '#07456B',
    },
  },
  submitted: {
    '& h6:first-of-type': {
      fontWeight: '700',
      paddingTop: '2em',
      paddingBottom: '1em',
    },
  },
  imageSection: {
    textAlign: 'center',
    paddingTop: '3em',
    paddingBottom: '4em',
    '& :not(img:first-of-type)': {
      top: '20em',
      position: 'absolute',
      left: '11em',
    },
  },

};
