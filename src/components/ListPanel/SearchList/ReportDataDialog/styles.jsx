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
  requiredText: {
    fontStyle: 'italic',
    padding: '1em 1em 0 0',
    '& span': {
      color: 'red',
    },
  },
  formLabel: {
    color: '#434343',
    marginLeft: '-0.5em',
  },
  otherText: {
    width: '90%',
    marginLeft: '1.2em',
    border: '1px solid #CCCCCC',
    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.08)',
    borderRadius: '2px',
  },
  radioGroup: {
    '& .MuiRadio-root': {
      padding: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingLeft: '0.2em',
    },
  },
  moreDetail: {
    '& p:first-of-type': {
      paddingTop: '2em',
      paddingLeft: 0,
    },
    '& sup': {
      top: 0,
    },
    '& .MuiInputBase-root': {
      width: '100%',
      border: '1px solid #CCCCCC',
      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.08)',
      borderRadius: '2px',
    },
    '& .MuiTypography-body2': {
      paddingBottom: '2em',
      paddingTop: '1em',
      fontSize: '12px',
      color: 'black',
    },
  },
  disabledButton: {
    backgroundColor: '#A1A3A5',
    // The material ui disabled styles want to ignore this
    color: 'white !important',
    padding: '0.4em 5em',
  },
  button: {
    backgroundColor: '#07456B',
    color: 'white',
    padding: '0.4em 5em',
  },
};
