/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import 'react-datepicker/dist/react-datepicker.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { makeStyles, Typography, Popover } from '@material-ui/core';
import PropTypes from 'prop-types';
import fr from 'date-fns/locale/fr-CA';
import { lang } from '../../constants';
import RangeSlider from './slider';

import { toDateOnly, toDateOnlyString } from '../../utilities/date';

// This registers the locale for react-datepicker
registerLocale('fr', fr);

const useStyles = makeStyles((theme) => ({
  /*
  These are style rules to scale up the date picker pop up
  */
  root: {
    width: '300px',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: 'transparent',
      marginTop: -12,
      marginLeft: -13,
    },
  },
  label: { fontWeight: 600 },
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

const CustomDatePicker = ({ maxDate, minDate, startDate, endDate, onChange }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shortenDate = (date) => new Date(date).toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const popover = (
    <>
      <div
        className={classes.datePicker}
        onClick={handleClick}
      >
        {startDate && endDate ? `${shortenDate(startDate)} - ${shortenDate(endDate)}` : ''}
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <RangeSlider />
      </Popover>
    </>
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>Date</Typography>
      {popover}
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

CustomDatePicker.defaultProps = {
  maxDate: null,
  minDate: null,
  startDate: null,
  endDate: null,
};
