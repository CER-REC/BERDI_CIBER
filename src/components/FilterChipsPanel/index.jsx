import React from 'react';
import PropTypes from 'prop-types';
import { Chip, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useConfig from '../../hooks/useConfig';
import useAPI from '../../hooks/useAPI';
import { lang } from '../../constants';

const useStyles = makeStyles(() => ({
  chip: {
    background: '#E1F1DA',
    border: '1px solid black',
    borderRadius: '30px',
    margin: '1em 0.5em 0 0.5em',
    paddingRight: '0.3em',
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    fill: 'black',
    transform: 'scale(1.15)',
  },
}));

const FilterChipsPanel = ({ initialData }) => {
  const classes = useStyles();
  const { config } = useConfig();
  const { minDate, maxDate, applicationIdLabels, regions } = useAPI();

  const handleChipClick = () => () => {
    // TODO: do filter statement to remove given chip name
  };

  // Prepare application chips
  const applicationChips = config.applicationIds.map((item) => applicationIdLabels[item]);

  // TODO: prepare / format regions chips
  const regionChips = config.regions.map((item) => regions[item]);

  // Prepare and format date range chip
  const hasStartDate = config.startDate.getTime() !== minDate.getTime();
  const hasEndDate = config.endDate.getTime() !== maxDate.getTime();
  const formattedStart = config.startDate.toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });
  const formattedEnd = config.endDate.toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });
  let dateRangeChip;
  if (hasStartDate && hasEndDate) {
    dateRangeChip = `${formattedStart} - ${formattedEnd}`;
  } else if (hasStartDate) {
    dateRangeChip = formattedStart;
  } else if (hasEndDate) {
    dateRangeChip = formattedEnd;
  }

  // TODO: prepare / format results chips

  // TOOD: prepare / format preojct type chips

  // TODO: prepare / format commodity chips

  // TODO: prepprepare / formatare status chips

  // Assemble all chips; filter out falsy values
  const chips = initialData.concat(config.searches,
    applicationChips, regionChips, dateRangeChip, config.contentTypes,
    config.projectTypes, config.commodities, config.statuses)
    .filter((x) => x);

  return (
    <>
      {chips.map((item) => (
        <Chip
          key={item}
          label={item}
          onClick={handleChipClick(item)}
          onDelete={handleChipClick(item)}
          deleteIcon={(
            <CloseIcon
              className={classes.closeButton}
            />
          )}
          className={classes.chip}
        />
      ))}
    </>
  );
};

FilterChipsPanel.defaultProps = {
  initialData: [],
};

FilterChipsPanel.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.string),
};

export default FilterChipsPanel;
