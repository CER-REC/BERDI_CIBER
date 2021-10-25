import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, TextField, makeStyles, Typography, Grid, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import { reportSearch } from '../../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  input: {
    width: '100%',
    '& input': {
      backgroundColor: theme.palette.common.white,
      borderBottomLeftRadius: '10px',
      borderTopLeftRadius: '10px',
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
    backgroundColor: theme.palette.common.white,
    textDecoration: 'underline',
    cursor: 'pointer',
    color: theme.palette.button.blue,
  },
}));

const SearchBar = ({ hasShrink }) => {
  const inputRef = useRef();
  const buttonRef = useRef();
  const [search, setSearch] = useState('');
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

  // useEffect(() => {
  //   if (inputRef.current && buttonRef.current) {
  //     // Moving the button by the text field input to make it easier to style
  //     inputRef.current.parentNode.insertBefore(buttonRef.current, inputRef.current.nextSibling);
  //   }
  // }, [inputRef, buttonRef]);

  useEffect(() => setSearch(config.search), [config.search]);

  return (
    <div className={`Keywords ${classes.root}`}>
      <Grid container alignItems="center">
        <Grid item xs={9}>
          <TextField
            classes={{ root: classes.input }}
            label={intl.formatMessage({ id: 'components.searchPanel.searchPlaceHolder' })}
            variant="outlined"
            margin="dense"
            value={search}
            inputRef={inputRef}
            InputLabelProps={{
              classes: { shrink: hasShrink ? classes.labelShrink : classes.disabledLabelShrink },
            }}
            InputProps={{ classes: { notchedOutline: classes.noBorder } }}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </Grid>
        <Grid item xs={1}>
          <Box className={classes.searchHelpBox}>
            <Typography variant="body2" onClick={() => console.log('help clicked')}>
              {intl.formatMessage({ id: 'components.searchPanel.searchHelp' })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Button
            className={classes.button}
            aria-label={intl.formatMessage({ id: 'components.searchPanel.searchButton' })}
            variant="contained"
            ref={buttonRef}
            onClick={handleClick}
            disableElevation
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
