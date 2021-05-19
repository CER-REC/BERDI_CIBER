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
  const { config } = useConfig();
  const { minDate, maxDate, applicationIdLabels } = useAPI();
  const intl = useIntl();

  const handleChipClick = () => () => {
    // TODO: do filter statement to remove given chip name
  };

  const getFormattedDate = (date) => {
    return date.toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });
  };

  // Prepare keyword chip; make empty array if nothing found
  const keywordChip = config.searches.join(' ') || [];

  // Prepare application chips
  const applicationChips = config.applicationIds.map((item) => applicationIdLabels[item]);

  // Prepare region chips
  const regionChips = config.regions.map((item) => intl.formatMessage({ id: `common.regions.${item}` }));

  // Prepare and format date range chip
  const hasStartDate = config.startDate.getTime() !== minDate.getTime();
  const hasEndDate = config.endDate.getTime() !== maxDate.getTime();
  const formattedStart = getFormattedDate(config.startDate);
  const formattedEnd = getFormattedDate(config.endDate);
  const formattedMin = getFormattedDate(minDate);
  const formattedMax = getFormattedDate(maxDate);
  let dateRangeChip;
  if (!hasStartDate && !hasEndDate) {
    dateRangeChip = [];
  } else if (hasStartDate && hasEndDate) {
    dateRangeChip = `${formattedStart} - ${formattedEnd}`;
  } else if (hasStartDate) {
    dateRangeChip = `${formattedStart} - ${formattedMax}`;
  } else if (hasEndDate) {
    dateRangeChip = `${formattedMin} - ${formattedEnd}`;
  }

  // Prepare content type (results) chips
  const contentTypeChips = config.contentTypes.map((item) => intl.formatMessage({ id: `common.content.${item}` }));

  // Prepare project type chips
  const projectTypeChips = config.projectTypes.map((item) => intl.formatMessage({ id: `common.projects.${item}` }));

  // Prepare commodity chips
  const commodityChips = config.commodities.map((item) => intl.formatMessage({ id: `common.commodities.${item}` }));

  // Prepare status chips
  const statusChips = config.statuses.map((item) => intl.formatMessage({ id: `common.statuses.${item}` }));

  // Assemble all chips
  const chips = [].concat(
    keywordChip, applicationChips, regionChips, dateRangeChip,
    contentTypeChips, projectTypeChips, commodityChips, statusChips,
  );

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

export default FilterChipsPanel;
