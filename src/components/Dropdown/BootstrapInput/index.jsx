import { InputBase, withStyles } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    '& svg': {
      color: theme.palette.primary.main,
      height: '1.4em',
      marginTop: '-0.2em',
      marginRight: '0.2em',
      width: '1.4em',
    },
  },
  input: {
    border: '2px solid #000000',
    borderRadius: 5,
    fontSize: 16,
    padding: '0.5em',
    '&:focus': { borderRadius: 5 },
    '&.MuiSelect-select.MuiSelect-select': { paddingRight: '2em' },
  },
}))(InputBase);

export default BootstrapInput;
