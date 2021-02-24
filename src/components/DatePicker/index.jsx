import 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const inputStyles = makeStyles((theme) => createStyles({
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
}));

const useStyles = makeStyles({
  /*
  These are style rules to scale up the date picker pop up
  */
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
    '& .react-datepicker__input-container': {
      lineHeight: '1.1876em',

    },
  },
  label: {
    color: '#3d6a88',
  },
});

/*
    FIXME: there is a console warning about passing refs to functional components.
    Should this be a class component?
   */
const CustomInput = ({ onClick, startDate, endDate }) => {
  const classes = inputStyles();
  const shortenDate = (date) => new Date(date).toDateString();

  return (
    <input
      className={classes.datePicker}
      value={startDate && endDate ? `${shortenDate(startDate)} - ${shortenDate(endDate)}` : ''}
      onClick={onClick}
      readOnly
    />
  );
};

const CustomDatePicker = ({ maxDate, minDate }) => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date(minDate));
  const [endDate, setEndDate] = useState();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>Date</Typography>
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
        customInput={<CustomInput startDate={startDate} endDate={endDate} />}
      />
    </div>
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
};
CustomInput.propTypes = {
  onClick: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

CustomDatePicker.defaultProps = {
  maxDate: undefined,
  minDate: undefined,
};
CustomInput.defaultProps = {
  onClick: undefined,
  startDate: undefined,
  endDate: undefined,
};

