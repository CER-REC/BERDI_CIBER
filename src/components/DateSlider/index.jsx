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
    height: '5.5em',
    width: '300px',
    padding: '0.5em 1.5em 1.5em 1.5em',
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
  const [datePickerStartDate, setDatePickerStartDate] = useState(minDate.getTime());
  const [datePickerEndDate, setDatePickerEndDate] = useState(maxDate.getTime());

  /*
   * For ease of adding and subtracting times from dates,
   * the dates use the getTime() method to convert them to a
   * number that is equal to the number of milliseconds past
   * the unix epoch.
   */
  const unixMonth = 2678400000;
  const open = !!anchorEl;

  const handleChange = useCallback((_, dates) => {
    const [start, end] = dates;
    setDatePickerStartDate(start);
    setDatePickerEndDate(end);

    if (start && end) {
      onChange(new Date(start), new Date(end));
    }
  }, [setDatePickerStartDate, setDatePickerEndDate, onChange]);

  useEffect(() => {
    setDatePickerStartDate(startDate);
    setDatePickerEndDate(endDate);
  }, [startDate, endDate]);

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

          {datePickerStartDate && datePickerEndDate
            ? `${shortenDate(new Date(datePickerStartDate))} - ${shortenDate(new Date(datePickerEndDate))}`
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
          <Grid container justify="space-between" style={{ paddingBottom: '0.5em' }}>
            <Typography>
              {shortenDate(new Date(datePickerStartDate))}
            </Typography>

            <Typography>
              {shortenDate(new Date(datePickerEndDate))}
            </Typography>
          </Grid>

          <Slider
            classes={{
              rail: classes.line,
              thumb: classes.thumb,
              track: classes.line,
            }}
            value={[
              startDate.getTime() || minDate.getTime(),
              endDate.getTime() || maxDate.getTime(),
            ]}
            onChange={handleChange}
            min={minDate.getTime()}
            step={unixMonth}
            max={maxDate.getTime()}
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
