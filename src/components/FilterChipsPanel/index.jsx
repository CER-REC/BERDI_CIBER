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

const useAssembledChipLabels = () => {
  const { config } = useConfig();
  const { minDate, maxDate, applicationIdLabels } = useAPI();
  const intl = useIntl();
  const hasStartDate = config.startDate.getTime() !== minDate.getTime();
  const hasEndDate = config.endDate.getTime() !== maxDate.getTime();
  return {
    searches: [config.searches.join(' ')].filter(Boolean),
    applicationIds: config.applicationIds.map((item) => applicationIdLabels[item]),
    regions: config.regions.map((item) => intl.formatMessage({ id: `api.regions.${item}` })),
    contentTypes: config.contentTypes.map((item) => intl.formatMessage({ id: `api.content.${item}` })),
    projectTypes: config.projectTypes.map((item) => intl.formatMessage({ id: `api.projects.${item}` })),
    commodities: config.commodities.map((item) => intl.formatMessage({ id: `api.commodities.${item}` })),
    statuses: config.statuses.map((item) => intl.formatMessage({ id: `api.statuses.${item}` })),
    dateRange: (hasStartDate || hasEndDate)
      ? [`${getFormattedDate(config.startDate)} - ${getFormattedDate(config.endDate)}`] : [],
  };
};

const FilterChipsPanel = () => {
  const classes = useStyles();
  const { config, configDispatch } = useConfig();
  const chipLabels = useAssembledChipLabels();

  // Assemble new state on chip click
  const removeFilter = (chipType, index) => () => {
    const newState = config[chipType]?.filter((_, configIndex) => index !== configIndex);
    const action = (chipType === 'searches' || chipType === 'dateRange') ? 'removed' : 'changed';
    configDispatch({ type: `${chipType}/${action}`, payload: newState });
  };
  return (
    Object.keys(chipLabels).map((chipType) => chipLabels[chipType].map((chipLabel, index) => (
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
    )))
  );
};

export default FilterChipsPanel;
