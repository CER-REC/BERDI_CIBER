import { makeStyles, Popover, Slider, Typography } from '@material-ui/core';
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
    width: '335px',
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
    color: theme.palette.teal.blue,
  },
  label: {
    fontWeight: 600,
    color: theme.palette.teal.blue,
  },
  datePicker: {
    position: 'relative',
    fontSize: '1.57rem',
    border: `2px solid ${theme.palette.teal.blue}`,
    padding: '0.5em',
    borderRadius: '5px',
    minHeight: '39px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    width: '100%',
    '& span': {
      position: 'absolute',
      bottom: '8px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: 'calc(100% - 50px)',
      color: theme.palette.teal.blue,
    },
    '& img': {
      width: '2em',
      height: '1.4em',
      marginTop: '-0.2em',
      marginRight: '0.2em',
      top: '10px',
      right: 0,
      position: 'absolute',
    },

  },
}));

const DateSlider = ({ maxDate, minDate, startDate, endDate, onChange }) => {
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

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(totalDifference);

  // Take the min date and add the number of months different to get the slider start date.
  const toStartDate = useCallback((monthIndex) => {
    const start = new Date(minDate);

    start.setMonth(minDate.getMonth() + monthIndex);
    start.setDate(1);

    if (start < minDate) {
      return minDate;
    }

    return start;
  }, [minDate]);

  // Take the min date and add the number of months different to get the slider end date.
  const toEndDate = useCallback((monthIndex) => {
    const end = new Date(minDate);

    end.setMonth(minDate.getMonth() + monthIndex + 1);
    end.setDate(0);

    if (end > maxDate) {
      return maxDate;
    }

    return end;
  }, [minDate, maxDate]);

  const handleChange = useCallback((_, dates) => {
    const [start, end] = dates;
    setStartIndex(start);
    setEndIndex(end);

    // Send the change in dates to the reducer
    onChange(toStartDate(start), toEndDate(end));
  }, [onChange, toEndDate, toStartDate]);

  useEffect(() => {
    setStartIndex(getMonthDifference(startDate));
    setEndIndex(getMonthDifference(endDate));
  }, [startDate, endDate, getMonthDifference]);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const shortenDate = (date) => new Date(date).toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });

  return (
    <>
      <Typography className={classes.label}>{intl.formatMessage({ id: 'components.dropdown.dateLabel' })}</Typography>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={classes.datePicker}
        onClick={handlePopoverClick}
        role="button"
        tabIndex={0}
      >
        <span>{`${shortenDate(toStartDate(startIndex))} - ${shortenDate(toEndDate(endIndex))}`}</span>
        <img src={sliderIcon} alt="a depiction of the date slider" />
      </div>

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
              startIndex || 0,
              endIndex || totalDifference,
            ]}
            onChange={handleChange}
            min={0}
            step={1}
            max={totalDifference}
          />
        </div>
      </Popover>
    </>
  );
};
export default DateSlider;

DateSlider.propTypes = {
  maxDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};

DateSlider.defaultProps = {
  startDate: null,
  endDate: null,
};
