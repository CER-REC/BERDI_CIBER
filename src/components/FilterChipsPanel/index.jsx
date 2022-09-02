import React, { useCallback } from 'react';
import { Chip, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import useAPI from '../../hooks/useAPI';
import { reportChip } from '../../utilities/analytics';
import { lang } from '../../constants';

const useStyles = makeStyles(() => ({
  chip: {
    background: '#EDEDED',
    borderRadius: '30px',
    margin: '0 0.5em 0.8em 0.5em',
    fontSize: 16,
    color: 'black',
    maxWidth: '32em',
  },
  closeButton: {
    fill: 'black',
    transform: 'scale(1.15)',
  },
  clearAllButton: {
    marginLeft: '0.5em',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
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
    search: [config.search].filter(Boolean),
    applicationIds: config.applicationIds.map((item) => applicationIdLabels[item]),
    regions: config.regions.map((item) => intl.formatMessage({ id: `api.regions.${item}` })),
    contentTypes: config.contentTypes.map((item) => intl.formatMessage({ id: `api.content.${item}` })),
    projectTypes: config.projectTypes.map((item) => intl.formatMessage({ id: `api.projects.${item}` })),
    commodities: config.commodities.map((item) => intl.formatMessage({ id: `api.commodities.${item}` })),
    statuses: config.statuses.map((item) => intl.formatMessage({ id: `api.statuses.${item}` })),
    topics: config.topics.map((item) => intl.formatMessage({ id: `common.vcLabels.${item}.label` })),
    dateRange: (hasStartDate || hasEndDate)
      ? [`${getFormattedDate(config.startDate)} - ${getFormattedDate(config.endDate)}`] : [],
  };
};

const FilterChipsPanel = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const chipLabels = useAssembledChipLabels();
  const noFilters = Object.values(chipLabels).every((array) => array.length === 0);
  const handleClick = useCallback(() => configDispatch({ type: 'filters/removed' }), [configDispatch]);

  // Assemble new state on chip click
  const removeFilter = (chipType, index, label) => () => {
    reportChip(label);

    if ((chipType === 'search') || (chipType === 'topics') || (chipType === 'dateRange')) {
      configDispatch({ type: `${chipType}/removed`, payload: config[chipType]?.[index] });

      return;
    }

    const newState = config[chipType].filter((_, configIndex) => index !== configIndex);

    configDispatch({ type: `${chipType}/changed`, payload: newState });
  };
  return (
    <div>
      <Grid container direction="row">
        <Grid item>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: 'components.filterChipsPanel.title' }).toUpperCase()}
          </Typography>
        </Grid>
        {!noFilters
          && (
          <Grid item>
            <Button color="inherit" className={classes.clearAllButton} onClick={handleClick}>
              <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                {intl.formatMessage({ id: 'common.clearButton' })}
              </Typography>
            </Button>
          </Grid>
          )}
      </Grid>
      {
        Object.keys(chipLabels).map((chipType) => chipLabels[chipType].map((chipLabel, index) => (
          <Chip
            aria-label={intl.formatMessage({ id: 'components.filterChipsPanel.chipAriaText' }, { term: chipLabel })}
            key={chipLabel}
            label={chipLabel}
            onClick={removeFilter(chipType, index, chipLabel)}
            onDelete={removeFilter(chipType, index, chipLabel)}
            deleteIcon={<CloseIcon className={classes.closeButton} />}
            className={classes.chip}
          />
        )))
      }
    </div>
  );
};

export default FilterChipsPanel;
