import React, { useCallback, useEffect, useState } from 'react';
import { Button, TextField, makeStyles, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import { reportSearch, reportSearchHelp } from '../../../utilities/analytics';
import SearchHelpDialog from '../SearchHelpDialog';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  input: {
    width: '100%',
    margin: '0',
    '& input': {
      backgroundColor: theme.palette.common.white,
      borderBottomLeftRadius: '10px',
      borderTopLeftRadius: '10px',
      padding: '11px',
    },
    '& legend': { width: 0 },
  },
  labelShrink: {
    backgroundColor: theme.palette.common.white,
    backgroundRepeat: 'no-repeat',
    padding: '0 10px',
    paddingTop: '4px',
  },
  disabledLabelShrink: { display: 'none' },
  button: {
    borderRadius: '0 10px 10px 0',
    backgroundColor: theme.palette.secondary.main,
    padding: '8px',
    minWidth: '50px',
  },
  noBorder: { border: 'none' },
  searchHelpBox: {
    minWidth: '3em',
    maxWidth: '7em',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.button.blue,
    fontSize: 14,
  },
}));

const SearchBar = ({ hasShrink }) => {
  const [search, setSearch] = useState('');
  const [searchHelpOpen, setSearchHelpOpen] = useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const handleChange = useCallback((event) => setSearch(event.target.value), [setSearch]);
  const handleClick = useCallback(() => {
    reportSearch(search);
    configDispatch({ type: 'search/changed', payload: search.trim() });
  }, [search, configDispatch]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);
  const handleSearchHelpClick = useCallback(() => {
    setSearchHelpOpen(true);
    reportSearchHelp();
  }, []);

  useEffect(() => setSearch(config.search), [config.search]);

  return (
    <div className={`Keywords ${classes.root}`}>
      <SearchHelpDialog open={searchHelpOpen} onClose={() => setSearchHelpOpen(false)} />
      <Grid container wrap="nowrap">
        <Grid item xs={9}>
          <TextField
            classes={{ root: classes.input }}
            label={intl.formatMessage({ id: 'components.searchPanel.searchPlaceHolder' })}
            id={intl.formatMessage({ id: 'components.searchPanel.searchPlaceHolder' })}
            variant="outlined"
            margin="dense"
            value={search}
            InputLabelProps={{
              classes: { shrink: hasShrink ? classes.labelShrink : classes.disabledLabelShrink },
            }}
            InputProps={{ classes: { notchedOutline: classes.noBorder } }}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </Grid>
        <Grid item container xs={2} alignItems="center" justify="space-evenly" className={classes.searchHelpBox}>
          <Button
            aria-label={intl.formatMessage({ id: 'components.searchPanel.searchHelp' })}
            color="inherit"
            onClick={handleSearchHelpClick}
            disableRipple
          >
            {intl.formatMessage({ id: 'components.searchPanel.searchHelp' })}
          </Button>
        </Grid>
        <Grid item container xs={1}>
          <Button
            className={classes.button}
            aria-label={intl.formatMessage({ id: 'components.searchPanel.searchButton' })}
            variant="contained"
            onClick={handleClick}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

SearchBar.propTypes = {
  hasShrink: PropTypes.bool.isRequired,
};

export default SearchBar;
