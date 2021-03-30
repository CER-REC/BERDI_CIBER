import 'react-datepicker/dist/react-datepicker.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { toDateOnly, toDateOnlyString } from '../../utilities/date';

const inputStyles = makeStyles((theme) => createStyles({
  datePicker: {
    width: '100%',
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000000',
    fontSize: 16,
    padding: '0.5em',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': { borderRadius: 5 },
  },
}));

const useStyles = makeStyles({
  /*
  These are style rules to scale up the date picker pop up
  */
  root: {
    '& .react-datepicker, .react-datepicker__header': {
      fontSize: '1.3rem',
      lineHeight: '2.3rem',
      marginTop: '-0.3rem',
      paddingTop: '0.3rem',
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
  label: { fontWeight: 600 },
});

// eslint-disable-next-line no-unused-vars
const CustomInput = React.forwardRef(({ onClick, startDate, endDate }, ref) => {
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
});

const CustomDatePicker = ({ maxDate, minDate, startDate, endDate, onChange }) => {
  const classes = useStyles();
  const [datePickerStartDate, setDatePickerStartDate] = useState(minDate);
  const [datePickerEndDate, setDatePickerEndDate] = useState(maxDate);
  const minMonthDate = useMemo(
    () => toDateOnly(`${toDateOnlyString(minDate).substring(0, 8)}01`),
    [minDate],
  );
  const maxMonthDate = useMemo(() => {
    const date = new Date(maxDate);

    date.setMonth(date.getMonth() + 1);

    return toDateOnly(`${toDateOnlyString(date).substring(0, 8)}01`);
  }, [maxDate]);
  const handleChange = useCallback((dates) => {
    const [start, end] = dates;

    setDatePickerStartDate(start);
    setDatePickerEndDate(end);

    if (start && end) {
      onChange(start, end);
    }
  }, [setDatePickerStartDate, setDatePickerEndDate, onChange]);

  useEffect(() => {
    setDatePickerStartDate(startDate);
    setDatePickerEndDate(endDate);
  }, [startDate, endDate]);

  // DatePicker passes down the onClick event for customInput
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
  onClick: PropTypes.func,
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
  onClick: null,
};
