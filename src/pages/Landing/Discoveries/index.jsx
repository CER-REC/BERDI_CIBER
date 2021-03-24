import React, { useCallback } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import ImageButton from '../../../components/ImageButton';
import useConfig from '../../../hooks/useConfig';
import fish from '../../../images/ditch-fish.png';
import nests from '../../../images/rare-species.png';
import wetlands from '../../../images/unnamed-wetlands.png';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '1em',
  },
  accreditations: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  buttons: {
    paddingBottom: '2em',
    paddingTop: '1em',
  },
}));

const Discoveries = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = useCallback((keywords) => {
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'searches/changed', payload: keywords });
  }, [configDispatch]);
  const createHandleClick = useCallback((keywords) => (() => handleClick(keywords)), [handleClick]);
  const fishTitle = intl.formatMessage({ id: 'pages.landing.discoveries.fish.title' });
  const nestsTitle = intl.formatMessage({ id: 'pages.landing.discoveries.nests.title' });
  const wetlandsTitle = intl.formatMessage({ id: 'pages.landing.discoveries.wetlands.title' });

  return (
    <div className={`Discoveries ${classes.root}`}>
      <Typography variant="h6">{intl.formatMessage({ id: 'pages.landing.discoveries.title' })}</Typography>
      <Grid container classes={{ root: classes.buttons }} spacing={3}>
        <Grid item xs={4}>
          <ImageButton
            src={wetlands}
            caption={intl.formatMessage({ id: 'pages.landing.discoveries.wetlands.body' })}
            label={wetlandsTitle}
            onClick={createHandleClick(wetlandsTitle.split(' '))}
            isTable
          />
        </Grid>
        <Grid item xs={4}>
          <ImageButton
            src={nests}
            caption={intl.formatMessage({ id: 'pages.landing.discoveries.nests.body' })}
            label={nestsTitle}
            onClick={createHandleClick(nestsTitle.split(' '))}
            isTable={false}
          />
        </Grid>
        <Grid item xs={4}>
          <ImageButton
            src={fish}
            caption={intl.formatMessage({ id: 'pages.landing.discoveries.fish.body' })}
            label={fishTitle}
            onClick={createHandleClick(fishTitle.split(' '))}
            isTable={false}
          />
        </Grid>
      </Grid>
      <Typography classes={{ root: classes.accreditations }} variant="h6">{intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.title' })}</Typography>
      <Typography classes={{ root: classes.accreditations }} component="p">{intl.formatMessage({ id: 'pages.landing.discoveries.accreditations.body' })}</Typography>
    </div>
  );
};

export default Discoveries;
