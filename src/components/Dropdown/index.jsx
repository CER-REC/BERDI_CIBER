import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    fontSize: '150%',
    color: '#3d6a88',
  },
}));

const dropdownTitles = {
  applicationNames: 'Project Name',
  applicationTypes: 'Project Type (NEB Act)',
  // FIXME: this is a typo on the back end
  commondities: 'Commodity',
  regions: 'Province',
  statuses: 'Pipeline Status',
  date: 'Date',
};

const DropDown = ({ title, data }) => {
  const classes = useStyles();

  const [val, setVal] = React.useState(data[0]);
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <FormControl className="formControl">
      <InputLabel className={classes.label}>{dropdownTitles[title]}</InputLabel>
      <Select
        value={val}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {data.map((entry) => <MenuItem key={`${entry}Dropdown`} value={entry}>{entry}</MenuItem>)}
      </Select>
    </FormControl>

  );
};

export default DropDown;

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
