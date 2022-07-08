import React, { useCallback, useEffect, useState } from 'react';
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
  button: {
    borderRadius: '0 10px 10px 0',
    backgroundColor: theme.palette.secondary.main,
    padding: '8px',
    minWidth: '50px',
  },
  noBorder: { border: 'none' },
  searchHelpBox: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.button.blue,
    display: 'flex',
    fontSize: 14,
    justifyContent: 'center',
    width: '10em',
  },
}));

const SearchBar = ({ hasShrink, textValue, onTextChanged, onEnterPressed }) => {
  const [searchHelpOpen, setSearchHelpOpen] = useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const handleSearchHelpClick = useCallback(() => {
    setSearchHelpOpen(true);
    reportSearchHelp();
  }, []);

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
          onChange={onTextChanged}
          onKeyDown={onEnterPressed}
          autoFocus
        />
        <Button
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
  onTextChanged: PropTypes.func,
  onEnterPressed: PropTypes.func,
};

SearchBar.defaultProps = {
  onTextChanged: () => { },
  onEnterPressed: () => { },
};

export default SearchBar;
