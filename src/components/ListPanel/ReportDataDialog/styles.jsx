const blue = '#07456B';

export default (theme) => ({
  root: {
    color: theme.palette.grey.dark,
  },
  titleSection: {
    backgroundColor: blue,
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
    color: theme.palette.grey.dark,
    marginLeft: '-0.5em',
  },
  otherText: {
    width: '90%',
    marginLeft: '1.2em',
    border: `1px solid ${theme.palette.grey.charcoal}`,
    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.08)',
    borderRadius: '2px',
    paddingLeft: '0.4em',
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
      border: `1px solid ${theme.palette.grey.charcoal}`,
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
    '&.Mui-disabled': {
      color: 'white',
    },
    padding: '0.4em 5em',
  },
  button: {
    backgroundColor: blue,
    color: 'white',
    padding: '0.4em 5em',
    '&:hover': {
      backgroundColor: blue,
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
    paddingBottom: '2em',
  },
});
