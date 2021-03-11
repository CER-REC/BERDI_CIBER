import 'react-datepicker/dist/react-datepicker.css';
import React, { useMemo, useState, useEffect } from 'react';
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
      fontSize: '1.3rem',
    },
    '& .react-datepicker__current-month': {
      fontSize: '1.3rem',
    },
    '& .react-datepicker__day-name, .react-datepicker__day': {
      margin: '0.5rem',
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

const CustomInput = React.forwardRef(({ startDate, endDate }, ref) => {
  const classes = inputStyles();
  const shortenDate = (date) => new Date(date).toDateString();

  return (
    <input
      className={classes.datePicker}
      value={startDate && endDate ? `${shortenDate(startDate)} - ${shortenDate(endDate)}` : ''}
      readOnly
    />
  );
});

const CustomDatePicker = ({ maxDate, minDate, startDate, endDate, onChange }) => {
  const classes = useStyles();
  const [datePickerStartDate, setDatePickerStartDate] = useState(minDate);
  const [datePickerEndDate, setDatePickerEndDate] = useState(maxDate);
  const minMonthDate = useMemo(
    () => new Date(`${minDate.toJSON().substring(0, 8)}01T00:00:00`),
    [minDate],
  );
  const maxMonthDate = useMemo(() => {
    const date = new Date(maxDate);

    date.setMonth(date.getMonth() + 1);

    return new Date(`${date.toJSON().substring(0, 8)}01T00:00:00`);
  }, [maxDate]);
  const handleChange = (dates) => {
    const [start, end] = dates;

    setDatePickerStartDate(start);
    setDatePickerEndDate(end);

    if (start && end) {
      onChange(start, end);
    }
  };

  useEffect(() => {
    setDatePickerStartDate(startDate);
    setDatePickerEndDate(endDate);
  }, [startDate, endDate]);

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>Date</Typography>
      <DatePicker
        onChange={handleChange}
        selected={datePickerStartDate}
        startDate={datePickerStartDate}
        endDate={datePickerEndDate}
        selectsRange
        shouldCloseOnSelect={false}
        minDate={minMonthDate}
        maxDate={maxMonthDate}
        customInput={<CustomInput startDate={startDate} endDate={endDate} />}
        showMonthYearPicker
      />
    </div>
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};

CustomInput.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

CustomDatePicker.defaultProps = {
  maxDate: null,
  minDate: null,
  startDate: null,
  endDate: null,
};

CustomInput.defaultProps = {
  startDate: null,
  endDate: null,
};
