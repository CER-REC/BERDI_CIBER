import React, { useCallback } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

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
  const { configDispatch } = useConfig();
  const handleKeywordClick = useCallback((keyword) => {
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'searches/changed', payload: [keyword] });
  }, [configDispatch]);
  const createHandleKeywordClick = useCallback(
    (keyword) => (() => handleKeywordClick(keyword)),
    [handleKeywordClick],
  );

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
          label={fishKeyword}
          onClick={createHandleKeywordClick(fishKeyword)}
        />
        <SvgButton
          src={plants}
          label={plantsKeyword}
          onClick={createHandleKeywordClick(plantsKeyword)}
        />
        <SvgButton
          src={water}
          label={emissionsKeyword}
          onClick={createHandleKeywordClick(emissionsKeyword)}
        />
        <SvgButton
          src={health}
          label={healthKeyword}
          onClick={createHandleKeywordClick(healthKeyword)}
        />
        <SvgButton
          src={building}
          label={communityKeyword}
          onClick={createHandleKeywordClick(communityKeyword)}
        />
        <SvgButton
          src={warning}
          label={riskKeyword}
          onClick={createHandleKeywordClick(riskKeyword)}
        />
      </Grid>
    </div>
  );
};

export default Keywords;
