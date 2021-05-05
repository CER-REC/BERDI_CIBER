import { ButtonBase, Grid, Icon, makeStyles, Popover, Slider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { lang } from '../../constants';
import sliderIcon from '../../images/datePicker/sliderIcon.svg';

const useStyles = makeStyles((theme) => ({
  popover: {
    '& .MuiPopover-paper': {
      backgroundColor: '#F8F8F8',
      border: '1px solid #9E9E9E',
      borderRadius: 'unset',
    },
  },
  slider: {
    height: '5em',
    width: '300px',
    padding: '1.5em',
  },
  thumb: {
    background: theme.palette.button.blue,
    height: '2em',
    marginTop: '-1em',
    width: '1em',
    '&:not(:last-child)': {
      borderBottomLeftRadius: '5em',
      borderTopLeftRadius: '5em',
      transform: 'translateX(-0.5em)',
    },
    '&:last-child': {
      borderBottomRightRadius: '5em',
      borderTopRightRadius: '5em',
      transform: 'translateX(0.5em)',
    },
  },
  line: {
    transform: 'translateX(2px)',
  },
  label: { fontWeight: 600 },
  datePicker: {
    width: '100%',
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000000',
    fontSize: 16,
    padding: '0.4em',
    justifyContent: 'flex-start',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': { borderRadius: 5 },
  },
}));

const CustomDatePicker = ({ maxDate, minDate, startDate, endDate, onChange }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = !!anchorEl;

  const getMonthDifference = useCallback(
    (date) => date.getMonth()
    - minDate.getMonth()
    + (12 * (date.getFullYear() - minDate.getFullYear())),
    [minDate],
  );

  const totalDifference = getMonthDifference(maxDate);

  const [datePickerStartDate, setDatePickerStartDate] = useState(0);
  const [datePickerEndDate, setDatePickerEndDate] = useState(totalDifference);

  // Take the min date and add the number of months different to get the slider date.
  const convertToDate = useCallback((monthDiff) => {
    const returnDate = new Date(minDate);

    returnDate.setMonth(minDate.getMonth() + monthDiff);

    // This if block handles setting the dates to be either
    // on the first of the month, if the date is greater than to minDate
    // or on the last of the month, if the date is equal to maxDate
    if (returnDate.getTime() > minDate.getTime()) {
      if (returnDate.setDate(1) === maxDate.setDate(1)) {
        // set the date one month forward, then roll it back one day
        returnDate.setMonth(returnDate.getMonth() + 1);
        returnDate.setDate(0);
      } else {
        returnDate.setDate(1);
      }
    }
    return returnDate;
  },
  [maxDate, minDate]);

  const handleChange = useCallback((_, dates) => {
    const [start, end] = dates;
    setDatePickerStartDate(start);
    setDatePickerEndDate(end);

    if (start && end) {
      onChange(convertToDate(start), convertToDate(end));
    }
  }, [convertToDate, onChange]);

  useEffect(() => {
    setDatePickerStartDate(getMonthDifference(startDate));
    setDatePickerEndDate(getMonthDifference(endDate));
  }, [startDate, endDate, minDate, getMonthDifference]);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const shortenDate = (date) => new Date(date).toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });

  return (
    <div style={{ width: '300px' }}>
      <Typography className={classes.label}>{intl.formatMessage({ id: 'components.dropdown.dateLabel' })}</Typography>
      <ButtonBase
        disableRipple
        className={classes.datePicker}
        onClick={handlePopoverClick}
      >
        <Grid container alignItems="center" justify="space-between">

          {datePickerStartDate >= 0 && datePickerEndDate >= 0
            ? `${shortenDate(convertToDate(datePickerStartDate))} - ${shortenDate(convertToDate(datePickerEndDate))}`
            : ''}
          <Icon style={{ width: 'auto' }}>
            <img style={{ verticalAlign: 'baseline' }} src={sliderIcon} alt="a depiction of the date slider" />
          </Icon>
        </Grid>
      </ButtonBase>

      <Popover
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.slider}>
          <Slider
            classes={{
              rail: classes.line,
              thumb: classes.thumb,
              track: classes.line,
            }}
            value={[
              datePickerStartDate || 0,
              datePickerEndDate || totalDifference,
            ]}
            onChange={handleChange}
            min={0}
            step={1}
            max={totalDifference}
          />
        </div>
      </Popover>
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
