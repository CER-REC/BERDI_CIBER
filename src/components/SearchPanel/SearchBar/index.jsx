import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
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
  labelShrink: {
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
  disabledLabelShrink: { display: 'none' },
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
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
    const searches = search.split(' ').filter((term) => term);

    configDispatch({ type: 'searches/changed', payload: searches });
  }, [search, configDispatch]);
  const handleKeyDown = useCallback((event) => (event.key === 'Enter') && handleClick(), [handleClick]);

  useEffect(() => {
    if (inputRef.current && buttonRef.current) {
      // Moving the button by the text field input to make it easier to style
      inputRef.current.parentNode.insertBefore(buttonRef.current, inputRef.current.nextSibling);
    }
  }, [inputRef, buttonRef]);

  useEffect(() => setSearch(config.searches.join(' ')), [config.searches]);

  return (
    <div className={`Keywords ${classes.root}`}>
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <Button
        classes={{ root: classes.button }}
        variant="contained"
        ref={buttonRef}
        onClick={handleClick}
        disableElevation
      >
        {intl.formatMessage({ id: 'components.searchPanel.searchButton' })}
      </Button>
    </div>
  );
};

SearchBar.propTypes = {
  hasShrink: PropTypes.bool.isRequired,
};

export default SearchBar;
