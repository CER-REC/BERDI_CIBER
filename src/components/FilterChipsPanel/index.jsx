import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
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

const FilterChipsPanel = () => {
  const classes = useStyles();
  const { config, configDispatch } = useConfig();
  const { minDate, maxDate, applicationIdLabels } = useAPI();
  const intl = useIntl();
  let chips = {};

  // Prepare keyword chip; make empty array if nothing found
  chips.keywordChip = [config.searches.join(' ')] || [];

  // Prepare application chips
  chips.applicationChips = config.applicationIds.map((item) => applicationIdLabels[item]);

  // Prepare region chips
  chips.regionChips = config.regions.map((item) => intl.formatMessage({ id: `common.regions.${item}` }));

  // Prepare and format date range chip
  const getFormattedDate = (date) => date.toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });
  const hasStartDate = config.startDate.getTime() !== minDate.getTime();
  const hasEndDate = config.endDate.getTime() !== maxDate.getTime();
  const formattedStart = getFormattedDate(config.startDate);
  const formattedEnd = getFormattedDate(config.endDate);
  const formattedMin = getFormattedDate(minDate);
  const formattedMax = getFormattedDate(maxDate);
  if (!hasStartDate && !hasEndDate) {
    chips.dateRangeChip = [];
  } else if (hasStartDate && hasEndDate) {
    chips.dateRangeChip = [`${formattedStart} - ${formattedEnd}`];
  } else if (hasStartDate) {
    chips.dateRangeChip = [`${formattedStart} - ${formattedMax}`];
  } else if (hasEndDate) {
    chips.dateRangeChip = [`${formattedMin} - ${formattedEnd}`];
  }

  // Prepare content type (results) chips
  chips.contentTypeChips = config.contentTypes.map((item) => intl.formatMessage({ id: `common.content.${item}` }));

  // Prepare project type chips
  chips.projectTypeChips = config.projectTypes.map((item) => intl.formatMessage({ id: `common.projects.${item}` }));

  // Prepare commodity chips
  chips.commodityChips = config.commodities.map((item) => intl.formatMessage({ id: `common.commodities.${item}` }));

  // Prepare status chips
  chips.statusChips = config.statuses.map((item) => intl.formatMessage({ id: `common.statuses.${item}` }));

  const handleChipClick = (chipType, chipToDelete) => () => {
    console.log(`chipType: ${chipType}`);
    console.log(`chipToDelete: ${chipToDelete}`);

    // Remove specified chip from the given chip array type
    chips[chipType] = chips[chipType].filter((chip) => chip !== chipToDelete);

    // Find dispatch type
    let dispatchType;
    switch (chipType) {
      case 'keywordChip':
        dispatchType = 'searches/changed';
        break;
      case 'applicationChips':
        dispatchType = 'applicationIds/changed';
        break;
      case 'regionChips':
        dispatchType = 'regions/changed';
        break;
      case 'dateRangeChip':
        dispatchType = 'startDate/changed';
        break;
      case 'contentTypeChips':
        dispatchType = 'contentTypes/changed';
        break;
      case 'projectTypeChips':
        dispatchType = 'projectTypes/changed';
        break;
      case 'commodityChips':
        dispatchType = 'commodities/changed';
        break;
      case 'statusChips':
        dispatchType = 'statuses/changed';
        break;
      default:
        break;
    }

    // TODO: pass proper payload

    // Update config
    configDispatch({ type: dispatchType, payload: null });

    // Also update end date for date filter
    if (dispatchType === 'endDate/changed') {
      configDispatch({ type: dispatchType, payload: null });
    }
  };

  return (
    <>
      {Object.keys(chips).map((chipType) => chips[chipType].map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onClick={handleChipClick(chipType, chip)}
          onDelete={handleChipClick(chipType, chip)}
          deleteIcon={(
            <CloseIcon
              className={classes.closeButton}
            />
          )}
          className={classes.chip}
        />
      )))}
    </>
  );
};

export default FilterChipsPanel;
