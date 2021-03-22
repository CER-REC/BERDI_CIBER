import React, { useCallback } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useAPI from '../../../hooks/useAPI';
import useConfig from '../../../hooks/useConfig';
import building from '../../../images/building.svg';
import fish from '../../../images/fish.svg';
import health from '../../../images/health.svg';
import plants from '../../../images/plants.svg';
import warning from '../../../images/warning.svg';
import water from '../../../images/water.svg';
import SvgButton from '../../SvgButton';

const useStyles = makeStyles(() => ({
  root: { width: '100%' },
  label: {
    paddingBottom: '1em',
    paddingTop: '2em',
  },
  buttons: { textAlign: 'center' },
}));

const Keywords = () => {
  const classes = useStyles();
  const intl = useIntl();
  const fishKeyword = intl.formatMessage({ id: 'components.searchPanel.keywords.fish' });
  const plantsKeyword = intl.formatMessage({ id: 'components.searchPanel.keywords.plants' });
  const emissionsKeyword = intl.formatMessage({ id: 'components.searchPanel.keywords.emissions' });
  const healthKeyword = intl.formatMessage({ id: 'components.searchPanel.keywords.health' });
  const communityKeyword = intl.formatMessage({ id: 'components.searchPanel.keywords.community' });
  const riskKeyword = intl.formatMessage({ id: 'components.searchPanel.keywords.risk' });
  const { keywordCounts } = useAPI();
  const { configDispatch } = useConfig();
  const handleClick = useCallback((keyword) => {
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'searches/changed', payload: [keyword] });
  }, [configDispatch]);
  const createHandleClick = useCallback((keyword) => (() => handleClick(keyword)), [handleClick]);

  return (
    <div className={`Keywords ${classes.root}`}>
      <Grid item xs={12} classes={{ root: classes.label }}>
        <Typography variant="h6">
          {intl.formatMessage({ id: 'components.searchPanel.exploreLabel' })}
        </Typography>
      </Grid>
      <Grid item xs={12} classes={{ root: classes.buttons }}>
        <SvgButton
          src={fish}
          caption={fishKeyword}
          label={keywordCounts.fish}
          onClick={createHandleClick(fishKeyword)}
        />
        <SvgButton
          src={plants}
          caption={plantsKeyword}
          label={keywordCounts.plants}
          onClick={createHandleClick(plantsKeyword)}
        />
        <SvgButton
          src={water}
          caption={emissionsKeyword}
          label={keywordCounts.emissions}
          onClick={createHandleClick(emissionsKeyword)}
        />
        <SvgButton
          src={health}
          caption={healthKeyword}
          label={keywordCounts.health}
          onClick={createHandleClick(healthKeyword)}
        />
        <SvgButton
          src={building}
          caption={communityKeyword}
          label={keywordCounts.community}
          onClick={createHandleClick(communityKeyword)}
        />
        <SvgButton
          src={warning}
          caption={riskKeyword}
          label={keywordCounts.risk}
          onClick={createHandleClick(riskKeyword)}
        />
      </Grid>
    </div>
  );
};

export default Keywords;
