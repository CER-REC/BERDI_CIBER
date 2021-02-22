/* eslint-disable react/prop-types */
import 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { makeStyles, createStyles, InputLabel } from '@material-ui/core';
// import PropTypes from 'prop-types';

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
    '& .react-datepicker-wrapper': {
      width: '100%',
    },
  },
  datePicker: {
    width: '95%',
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
    fontSize: '120%',
    color: '#3d6a88',
  },
  margin: {
    margin: '0px',
  },
}));

export default ({ maxDate, minDate }) => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date(minDate));
  const [endDate, setEndDate] = useState();
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const shortenDate = (date) => {
    const shortDate = new Date(date);

    return shortDate.toDateString();
  };

  /*
    FIXME: there is a console warning about passing refs to functional components.
    Should this be a class component?
   */
  const CustomInput = ({ onClick }) => (
    <input
      className={classes.datePicker}
      value={startDate && endDate ? `${shortenDate(startDate)} - ${shortenDate(endDate)}` : ''}
      onClick={onClick}
      readOnly
    />
  );
  return (
    <>
      <div className={classes.root}>
        <InputLabel className={classes.label}>Date</InputLabel>

        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          shouldCloseOnSelect={false}
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
          monthsShown={2}
          customInput={<CustomInput />}
        />
      </div>
    </>
  );
};
