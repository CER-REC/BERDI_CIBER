import React, { useCallback, useState } from 'react';
import { Button, TextField, makeStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { reportSearchHelp } from '../../../utilities/analytics';
import SearchHelpDialog from '../SearchHelpDialog';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  input: {
    width: '100%',
    margin: '0',
    '& input': {
      backgroundColor: theme.palette.common.white,
      borderRadius: '10px',
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
  noBorder: { border: 'none' },
  helpButton: {
    marginLeft: '1em',
    fontSize: '12px',
    width: '10em',
  },
}));

const SearchBar = ({ hasShrink, textValue, onTextChanged, onKeyDown }) => {
  const [searchHelpOpen, setSearchHelpOpen] = useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const handleSearchHelpClick = useCallback(() => {
    setSearchHelpOpen(true);
    reportSearchHelp();
  }, []);
  const inputProps = {
    'aria-label': intl.formatMessage({ id: 'components.searchPanel.searchAriaText' })
  }

  return (
    <div className={`Keywords ${classes.root}`}>
      <SearchHelpDialog open={searchHelpOpen} onClose={() => setSearchHelpOpen(false)} />
      <Grid container wrap="nowrap">
        <TextField
          classes={{ root: classes.input }}
          label={intl.formatMessage({ id: 'components.searchPanel.searchPlaceHolder' })}
          variant="outlined"
          margin="dense"
          value={textValue}
          InputLabelProps={{
            classes: { shrink: hasShrink ? classes.labelShrink : classes.disabledLabelShrink },
          }}
          InputProps={{ classes: { notchedOutline: classes.noBorder } }}
          inputProps={inputProps}
          onChange={onTextChanged}
          onKeyDown={onKeyDown}
          autoFocus
        />
        <Button
          className={classes.helpButton}
          aria-label={intl.formatMessage({ id: 'components.searchPanel.searchHelp' })}
          color="inherit"
          onClick={handleSearchHelpClick}
          disableRipple
        >
          {intl.formatMessage({ id: 'components.searchPanel.searchHelp' })}
        </Button>
      </Grid>
    </div>
  );
};

SearchBar.propTypes = {
  hasShrink: PropTypes.bool.isRequired,
  textValue: PropTypes.string,
  onTextChanged: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  textValue: null,
};

export default SearchBar;
