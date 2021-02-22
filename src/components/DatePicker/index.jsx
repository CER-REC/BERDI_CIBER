import 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& .react-datepicker': {
      fontSize: '1.3rem !important',
    },
    '& .react-datepicker__current-month': {
      fontSize: '1.3rem !important',
    },
    '& .react-datepicker__header': {
      paddingTop: '6px !important',
    },
    '& .react-datepicker__navigation': {
      top: '13px !important',
    },
    '& .react-datepicker__day-name, .react-datepicker__day': {
      margin: '0.5rem !important',
    },
  },
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
  const classes = useStyles();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <>
      <div className={classes.root}>
        <DatePicker
          className={classes.datePicker}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          shouldCloseOnSelect={false}
          // minDate={subDays(new Date(), 5)}
          // maxDate={addDays(new Date(), 5)}
          monthsShown={2}
          placeholderText={startDate && endDate ? `${startDate} - ${endDate}` : ''}
        />
      </div>
    </>
  );
}
