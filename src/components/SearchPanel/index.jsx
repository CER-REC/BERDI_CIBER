import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Grid, Switch, TextField, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';
import Keywords from './Keywords';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: '1.5em',
  },
  input: {
    width: '100%',
    '& fieldset': { border: '2px solid #000000' },
    '& input': {
      backgroundColor: theme.palette.common.white,
      borderBottomLeftRadius: '4px',
      borderTopLeftRadius: '4px',
    },
    '& legend': { width: 0 },
  },
  inputLabelShrink: {
    backgroundColor: theme.palette.common.white,
    background: 'linear-gradient(#000, #000), linear-gradient(#000, #000), linear-gradient(#000, #000)',
    // The .5 accounts for rendering differences between Chrome and Firefox
    backgroundSize: '2px 14.5px, 100% 2px, 2px 14.5px',
    backgroundPosition: 'top left, top center, top right',
    backgroundRepeat: 'no-repeat',
    padding: '0 10px',
    paddingTop: '4px',
    '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(8px, -10px) scale(0.75)',
    },
  },
  disabledInputLabelShrink: { display: 'none' },
  searchButton: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  filterBlock: {
    margin: 'auto',
    textAlign: 'right',
  },
  filterLabel: {
    display: 'inline-block',
    paddingRight: '0.5em',
    verticalAlign: 'middle',
  },
}));

const SearchPanel = ({ hasFilter }) => {
  const inputRef = useRef();
  const buttonRef = useRef();
  const [search, setSearch] = useState('');
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const handleTextChange = useCallback((event) => setSearch(event.target.value), [setSearch]);
  const handleSearchClick = useCallback(() => {
    const searches = search.split(' ').filter((term) => term);

    configDispatch({ type: 'searches/changed', payload: searches });
  }, [search, configDispatch]);
  const handleKeyDown = useCallback((event) => (event.key === 'Enter') && handleSearchClick(), [handleSearchClick]);
  const handleExploreClick = useCallback(() => {
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'searches/changed', payload: null });
  }, [configDispatch]);

  useEffect(() => {
    if (inputRef.current && buttonRef.current) {
      // Moving the button by the text field input to make it easier to style
      inputRef.current.parentNode.insertBefore(buttonRef.current, inputRef.current.nextSibling);
    }
  }, [inputRef, buttonRef]);

  useEffect(() => setSearch(config.searches.join(' ')), [config.searches]);

  return (
    <Grid container className={`SearchPanel ${classes.root}`}>
      {
        !hasFilter && (
          <Grid item xs={12}>
            <Typography variant="h6">
              {intl.formatMessage({ id: 'components.searchPanel.searchLabel' })}
            </Typography>
          </Grid>
        )
      }
      <Grid item xs={9}>
        <TextField
          classes={{ root: classes.input }}
          label={intl.formatMessage({ id: 'components.searchPanel.searchPlaceHolder' })}
          variant="outlined"
          margin="dense"
          value={search}
          inputRef={inputRef}
          InputLabelProps={{
            classes: {
              shrink: hasFilter ? classes.inputLabelShrink : classes.disabledInputLabelShrink,
            },
          }}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <Button
          classes={{ root: classes.searchButton }}
          variant="contained"
          ref={buttonRef}
          onClick={handleSearchClick}
          disableElevation
        >
          {intl.formatMessage({ id: 'components.searchPanel.searchButton' })}
        </Button>
      </Grid>
      <Grid item xs={3} classes={{ root: classes.filterBlock }}>
        {
          hasFilter && (
            <>
              <Typography classes={{ root: classes.filterLabel }} variant="h6">
                {intl.formatMessage({ id: 'components.searchPanel.filterLabel' })}
              </Typography>
              <Switch color="default" />
            </>
          )
        }
        {
          !hasFilter && (
            <Button
              variant="contained"
              onClick={handleExploreClick}
              disableElevation
            >
              {intl.formatMessage({ id: 'components.searchPanel.exploreButton' })}
            </Button>
          )
        }
      </Grid>
      { !hasFilter && <Keywords /> }
    </Grid>
  );
};

SearchPanel.propTypes = {
  hasFilter: PropTypes.bool,
};

SearchPanel.defaultProps = {
  hasFilter: false,
};

export default SearchPanel;
