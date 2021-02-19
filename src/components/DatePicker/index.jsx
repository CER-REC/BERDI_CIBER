import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DatePicker from 'react-datepicker';
import { makeStyles, createStyles, InputLabel, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({

  datePicker: {
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
  label: {
    fontSize: '100%',
    color: '#3d6a88',
  },
  margin: {
    margin: '0px',
  },
}));

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  const classes = useStyles();

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const [startDate, setStartDate] = useState(new Date('2014/02/08'));
  const [endDate, setEndDate] = useState(new Date('2014/02/10'));

  return (
  // <FormControl className={classes.margin}>
  //   <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //     <InputLabel className={classes.label}>Date</InputLabel>
  //     <KeyboardDatePicker
  //       className={classes.datePicker}
  //       disableToolbar
  //       variant="inline"
  //       format="MM/dd/yyyy"
  //       margin="normal"
  //       value={selectedDate}
  //       onChange={handleDateChange}
  //       KeyboardButtonProps={{
  //         'aria-label': 'change date',
  //       }}
  //     />
  //   </MuiPickersUtilsProvider>
  // </FormControl>

    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
}
