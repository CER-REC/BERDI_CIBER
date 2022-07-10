import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import AccuracyAlert from '../../components/AccuracyAlert';
import AddContentIdsButton from '../../components/AddContentIdsButton';
import Cart from '../../components/Cart';
import FilterChipsPanel from '../../components/FilterChipsPanel';
import FilterToggle from '../../components/FilterToggle';
import IKNotification from '../../components/IKNotification';
import LimitationsDialog from '../../components/LimitationsDialog';
import ListSection from '../../components/ListPanel';
import NavButtons from '../../components/NavButtons';
import OSDPFooter from '../../components/OSDPFooter';
import SearchDetails from '../../components/SearchDetails';
import SearchPanel from '../../components/SearchPanel';
import TopicsFilter from '../../components/TopicsFilter';
import TreeMapPanel from '../../components/TreeMapPanel';
import useAPI from '../../hooks/useAPI';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  dataButton: {
    color: theme.palette.purple.twilight,
    borderColor: theme.palette.purple.twilight,
    padding: '0.3em 5em',
  },
}));

const showOSDPFooter = false;
const Search = () => {
  const ref = useRef();
  const { loading } = useAPI();
  const { config } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const [limitationsOpen, setLimitationsOpen] = useState(false);
  const handleButtonClick = useCallback(() => setLimitationsOpen(true), [setLimitationsOpen]);
  const handleClose = useCallback(() => setLimitationsOpen(false), [setLimitationsOpen]);

  useEffect(() => {
    if (config.fragment === 'search') {
      ref.current.scrollIntoView({ behaviour: 'smooth' });
      config.fragment = '';
    }
  }, [config]);

  if (loading) {
    return null;
  }

  return (
    <>
      <AccuracyAlert />
      <Grid style={{ paddingBottom: '1.3em' }} container justify="space-between" alignItems="center">
        <Grid item>
          <NavButtons />
        </Grid>
        {config.page === 'search' && (
          <Grid item>
            <Button color="primary" variant="outlined" className={classes.dataButton} onClick={handleButtonClick}>
              {intl.formatMessage({ id: 'components.resultsList.dataButton.label' })}
            </Button>

            <LimitationsDialog
              open={limitationsOpen}
              hasDownload
              onClose={handleClose}
            />
          </Grid>
        )}
      </Grid>
      <SearchPanel hasTagline />
      <FilterToggle />
      {(config.filter === 'topic') && <TopicsFilter />}
      {(config.filter === 'project') && (<TreeMapPanel />)}
      <Grid container alignItems="center">
        <Grid item xs={12} ref={ref}>
          <SearchDetails />
        </Grid>
        <Grid item xs={9}>
          <FilterChipsPanel />
        </Grid>
        <Grid item xs={3}>
          <AddContentIdsButton />
        </Grid>
      </Grid>
      <IKNotification />
      <Cart />
      <ListSection />
      {showOSDPFooter && <OSDPFooter />}
    </>
  );
};

export default Search;
