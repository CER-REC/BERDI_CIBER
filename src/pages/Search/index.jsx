import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { reportSection } from '../../utilities/analytics';
import AccuracyAlert from '../../components/AccuracyAlert';
import AddContentIdsButton from '../../components/AddContentIdsButton';
import Cart from '../../components/Cart';
import FilterChipsPanel from '../../components/FilterChipsPanel';
import FilterToggle from '../../components/FilterToggle';
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
import info from '../../images/info.svg';
import Alert from '../../components/Alert';

const iconSize = '1.5em';

const useStyles = makeStyles((theme) => ({
  inlineButton: {
    color: theme.palette.purple.twilight,
    borderColor: theme.palette.purple.twilight,
    padding: '0.3em 5em',
    marginLeft: '0.5em',
  },
  icon: {
    backgroundColor: theme.palette.purple.twilight,
    backgroundImage: `url(${info})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto 50%',
    borderRadius: '50%',
    height: iconSize,
    marginRight: '1em',
    width: iconSize,
  },
}));

const showOSDPFooter = false;
const Search = () => {
  const { configDispatch } = useConfig();
  const ref = useRef();
  const { loading, notices } = useAPI();
  const { config } = useConfig();
  const classes = useStyles();
  const intl = useIntl();

  const [limitationsOpen, setLimitationsOpen] = useState(false);
  const handleButtonClick = useCallback(() => setLimitationsOpen(true), [setLimitationsOpen]);
  const handleClose = useCallback(() => setLimitationsOpen(false), [setLimitationsOpen]);

  const handleClick = useCallback(() => {
    const page = 'project';
    reportSection(page);
    configDispatch({ type: 'page/changed', payload: page });
  }, [configDispatch]);

  useEffect(() => {
    if (config.fragment === 'search') {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      // Removing fragment directly to workaround config
      // pushing multiple URL state changes into history
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
            <Button color="primary" variant="outlined" className={classes.inlineButton} onClick={handleClick}>
              <div className={classes.icon} />
              {intl.formatMessage({ id: 'pages.search.aboutBerdiButton' })}
            </Button>
            <Button color="primary" variant="outlined" className={classes.inlineButton} onClick={handleButtonClick}>
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
      { (notices.indexOf('SEARCH_TITLE') !== -1) && (
        <Alert
          className="SearchAlert alert-warning"
          title={intl.formatMessage({ id: 'api.notice.SEARCH_TITLE' })}
          body={intl.formatMessage({ id: 'api.notice.SEARCH_TEXT' })}
        />
      )}
      <Cart />
      <ListSection />
      {showOSDPFooter && <OSDPFooter />}
    </>
  );
};

export default Search;
