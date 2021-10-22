import { InputBase, withStyles } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    '& svg': {
      color: theme.palette.teal.blue,
      height: '1.4em',
      marginTop: '-0.2em',
      marginRight: '0.2em',
      width: '1.4em',
    },
  },
  input: {
    border: `2px solid ${theme.palette.teal.blue}`,
    borderRadius: 5,
    fontSize: 16,
    padding: '0.5em',
    '&:focus': { borderRadius: 5 },
    '&.MuiSelect-select.MuiSelect-select': {
      paddingRight: '2em',
      color: theme.palette.teal.blue,
    },
  },
}))(InputBase);

export default BootstrapInput;
