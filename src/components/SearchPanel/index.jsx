import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Grid, Switch, TextField, Typography, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: '1em',
  },
  input: {
    width: '100%',
    '& fieldset': { border: '2px solid #000000' },
    '& input': {
      backgroundColor: theme.palette.common.white,
      borderBottomLeftRadius: '4px',
      borderTopLeftRadius: '4px',
    },
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
  button: {
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

const SearchPanel = () => {
  const inputRef = useRef();
  const buttonRef = useRef();
  const [search, setSearch] = useState('');
  const classes = useStyles();
  const intl = useIntl();
  const { config, configDispatch } = useConfig();
  const handleTextChange = useCallback((event) => setSearch(event.target.value), [setSearch]);
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
    <Grid container className={`SearchPanel ${classes.root}`}>
      <Grid item xs={8}>
        <TextField
          classes={{ root: classes.input }}
          label={intl.formatMessage({ id: 'components.searchPanel.input' })}
          variant="outlined"
          margin="dense"
          value={search}
          inputRef={inputRef}
          InputLabelProps={{ classes: { shrink: classes.inputLabelShrink } }}
          onChange={handleTextChange}
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
          {intl.formatMessage({ id: 'components.searchPanel.button' })}
        </Button>
      </Grid>
      <Grid item xs={4} classes={{ root: classes.filterBlock }}>
        <Typography classes={{ root: classes.filterLabel }} variant="h6">
          {intl.formatMessage({ id: 'components.searchPanel.filter' })}
        </Typography>
        <Switch color="default" />
      </Grid>
    </Grid>
  );
};

export default SearchPanel;
