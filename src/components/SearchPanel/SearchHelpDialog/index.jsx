import React from 'react';
import { makeStyles, Typography, Grid, Dialog, IconButton, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: '80%',
  },
  header: {
    background: theme.palette.teal.blue,
    color: theme.palette.common.white,
  },
  closeButton: {
    color: theme.palette.common.white,
  },
  content: {
    margin: '1em 0',
  },
  bodyText: {
    lineHeight: 1.5,
  },
  exampleText: {
    background: theme.palette.blue.inline,
    paddingLeft: '1.5em',
    marginBottom: '0.5em',
    lineHeight: 2,
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
}));

const SearchHelpDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
    >
      {/* Header */}
      <Grid container className={classes.header} alignItems="center">
        <Grid item xs={11}>
          <Typography variant="h6" style={{ padding: '1em 1.5em' }}>
            {intl.formatMessage({ id: 'components.searchPanel.searchHelp' })}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton className={classes.closeButton} aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      <DialogContent className={classes.content}>
        <Typography className={classes.bodyText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.help1' })}
        </Typography>
        <br />
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example1' })}
        </Typography>
        <Typography className={classes.bodyText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.help2' })}
        </Typography>
        <br />

        <Typography style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exactPhraseHeader' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ padding: '1em 0' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exact1' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example2' })}
        </Typography>
        <Typography className={classes.bodyText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exact2' })}
        </Typography>
        <br />

        <Typography style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.requireOrExcludeHeader' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ padding: '1em 0' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.require1' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example3' })}
        </Typography>
        <Typography className={classes.bodyText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.require2' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ padding: '1em 0' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exclude1' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example4' })}
        </Typography>
        <Typography className={classes.bodyText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exclude2' })}
        </Typography>
        <br />

        <Typography style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.booleanHeader' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ paddingTop: '1em' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.boolean1' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ paddingBottom: '1em' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.boolean2' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example5' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.isTheSameAs' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example6' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ padding: '1em 0' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.boolean3' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example7' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.isTheSameAs' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example8' })}
        </Typography>
        <br />

        <Typography style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.specificFieldHeader' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ padding: '1em 0' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.specificField1' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.exampleHeader' })}
        </Typography>
        <Typography className={classes.exampleText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.example9' })}
        </Typography>
        <Typography className={classes.bodyText}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.specificField2' })}
        </Typography>
        <Typography className={classes.bodyText} style={{ paddingTop: '1em' }}>
          {intl.formatMessage({ id: 'components.searchPanel.helpDialog.availableFieldsHeader' })}
        </Typography>
        <ul>
          <li>{intl.formatMessage({ id: 'components.searchPanel.helpDialog.fieldItem1' })}</li>
          <li>{intl.formatMessage({ id: 'components.searchPanel.helpDialog.fieldItem2' })}</li>
          <li>{intl.formatMessage({ id: 'components.searchPanel.helpDialog.fieldItem3' })}</li>
          <li>{intl.formatMessage({ id: 'components.searchPanel.helpDialog.fieldItem4' })}</li>
          <li>{intl.formatMessage({ id: 'components.searchPanel.helpDialog.fieldItem5' })}</li>
        </ul>
        <br />
        <Typography className={classes.bodyText}>
          {intl.formatMessage(
            { id: 'components.searchPanel.helpDialog.specificField4' },
            {
              luceneLink: (
                <a href="https://lucene.apache.org/core/2_9_4/queryparsersyntax.html" target="_blank" rel="noopener noreferrer">
                  {intl.formatMessage({ id: 'components.searchPanel.helpDialog.luceneLink' })}
                </a>
              ),
            },
          )}
        </Typography>
      </DialogContent>
    </Dialog>

  );
};

SearchHelpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchHelpDialog;
