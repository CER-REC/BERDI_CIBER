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

const getFormattedDate = (date) => date.toLocaleDateString(`${lang}-CA`, { year: 'numeric', month: 'short' });

const FilterChipsPanel = () => {
  const classes = useStyles();
  const { config, configDispatch } = useConfig();
  const { minDate, maxDate, applicationIdLabels } = useAPI();
  const intl = useIntl();
  const chipLabels = {};

  // Prepare keyword chip; make empty array if nothing found
  chipLabels.searches = [config.searches.join(' ')].filter(Boolean);

  // Prepare application chips
  chipLabels.applicationIds = config.applicationIds.map((item) => applicationIdLabels[item]);

  // Prepare region chips
  chipLabels.regions = config.regions.map((item) => intl.formatMessage({ id: `common.regions.${item}` }));

  // Prepare and format date range chip
  const hasStartDate = config.startDate.getTime() !== minDate.getTime();
  const hasEndDate = config.endDate.getTime() !== maxDate.getTime();
  chipLabels.dateRange = (hasStartDate || hasEndDate)
    ? [`${getFormattedDate(config.startDate)} - ${getFormattedDate(config.endDate)}`] : [];

  // Prepare content type (results) chips
  chipLabels.contentTypes = config.contentTypes.map((item) => intl.formatMessage({ id: `common.content.${item}` }));

  // Prepare project type chips
  chipLabels.projectTypes = config.projectTypes.map((item) => intl.formatMessage({ id: `common.projects.${item}` }));

  // Prepare commodity chips
  chipLabels.commodities = config.commodities.map((item) => intl.formatMessage({ id: `common.commodities.${item}` }));

  // Prepare status chips
  chipLabels.statuses = config.statuses.map((item) => intl.formatMessage({ id: `common.statuses.${item}` }));

  // Assemble new state
  const removeFilter = (chipType, index) => () => {
    const newState = config[chipType]?.filter((_, configIndex) => index !== configIndex);
    const action = (chipType === 'searches' || chipType === 'dateRange') ? 'removed' : 'changed';
    configDispatch({ type: `${chipType}/${action}`, payload: newState });
  };

  return (
    <>
      {Object.keys(chipLabels).map((chipType) => chipLabels[chipType].map((chipLabel, index) => (
        <Chip
          key={chipLabel}
          label={chipLabel}
          onClick={removeFilter(chipType, index)}
          onDelete={removeFilter(chipType, index)}
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
