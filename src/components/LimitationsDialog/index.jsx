import { Button, Dialog, makeStyles, Typography, IconButton, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import CloseIcon from '@material-ui/icons/Close';
import useAPI from '../../hooks/useAPI';
import { reportDownload } from '../../utilities/analytics';

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: '5px',
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    '& hr': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      margin: '0 auto',
      width: 'calc(100% - 3em)',
    },
  },
  titleSection: {
    backgroundColor: theme.palette.blue.dark,
    color: theme.palette.common.white,
    '& button': {
      color: 'white',
      paddingRight: 0,
    },
    padding: '0 1em',
  },
  body: {
    padding: '1.5em',
    '& h6': {
      fontSize: '14px',
      fontWeight: 700,
    },
    '& p': {
      fontSize: '14px',
      lineHeight: 'normal',
      margin: 0,
      paddingTop: '1em',
      '&:not(:last-child)': { paddingBottom: '2em' },
    },
    '& span': {
      display: 'block',
      padding: '0.5em 0',
    },
  },
  downloadSection: {
    padding: '1.5em',
    borderColor: theme.palette.blue.dark,
    borderStyle: 'solid',
    borderWidth: '2px',
    margin: '0 1.5em 2em 1.5em',
    '& p': {
      fontSize: '14px',
      lineHeight: 'normal',
      '&:not(:first-child)': { paddingTop: '1.5em' },
    },
    '& span': {
      fontWeight: '700',
    },
    '& a': {
      backgroundColor: '#DFE1E3',
      color: theme.palette.blue.dark,
      marginTop: '1.5em',
    },
    '& a:visited': {
      color: '#theme.palette.blue.dark',
    },
  },
  cite: {
    background: 'white',
    fontWeight: 500,
    paddingLeft: 0,
    paddingRight: '0.5em',
    fontFamily: 'Roboto Mono',
  },
}));

const LimitationsDialog = ({ open, hasDownload, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { fileSize, csvCount, tableCount, fileDownloadURL } = useAPI();
  const handleClick = useCallback(() => {
    reportDownload(intl.messages['common.downloadAllTables']);
    onClose();
  }, [intl, onClose]);

  return (
    <Dialog
      className="LimitationsDialog"
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      {/* Title Section */}
      <Grid container className={classes.titleSection}>
        <Grid item xs={11} style={{ padding: '0.5em 0' }}>
          <Typography variant="h6">
            {intl.formatMessage({ id: 'components.limitationsDialog.title' })}
          </Typography>
        </Grid>

        <Grid container justify="flex-end" item xs={1}>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      <div className={classes.body}>
        <Typography component="h6">
          {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.title' })}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.body' })}
        </Typography>
        <Typography component="h6">
          {intl.formatMessage({ id: 'components.limitationsDialog.usage.title' })}
        </Typography>
        <Typography style={{ paddingBottom: '1em' }}>
          {intl.formatMessage({ id: 'components.limitationsDialog.usage.header' })}
        </Typography>
        <ul style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: '14px' }}>
          <li>
            {intl.formatMessage({ id: 'components.limitationsDialog.usage.bullet1' })}
          </li>
          <li>
            {intl.formatMessage({ id: 'components.limitationsDialog.usage.bullet2' })}
          </li>
          <li>
            {intl.formatMessage({ id: 'components.limitationsDialog.usage.bullet3' })}
          </li>
          <li>
            {intl.formatMessage({ id: 'components.limitationsDialog.usage.bullet4' })}
          </li>
          <li>
            {intl.formatMessage({ id: 'components.limitationsDialog.usage.bullet5' })}
          </li>
        </ul>
        <Typography style={{ paddingTop: 0 }}>
          {intl.formatMessage({ id: 'components.limitationsDialog.usage.footer' })}
        </Typography>
        <Typography component="h6">
          {intl.formatMessage({ id: 'components.limitationsDialog.citation.title' })}
        </Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.limitationsDialog.citation.body' },
              {
                cite: (
                  <span className={classes.cite}>
                    {intl.formatMessage({ id: 'components.limitationsDialog.citation.cite' })}
                  </span>
                ),
              },
            )
          }
        </Typography>
      </div>
      { hasDownload && (
        <div className={classes.downloadSection}>
          <Typography>
            {intl.formatMessage({ id: 'components.limitationsDialog.dataSection.zipText' })}
          </Typography>
          <Typography>
            <span>
              &#8226;
              {intl.formatMessage(
                { id: 'components.limitationsDialog.dataSection.countsText' },
                {
                  csvCount: intl.formatNumber(csvCount),
                  tableCount: intl.formatNumber(tableCount),
                  part2: (
                    <span style={{ fontWeight: 'normal' }}>
                      {intl.formatMessage({ id: 'components.limitationsDialog.dataSection.countsPart2' })}
                    </span>
                  ),
                },
              )}
            </span>
          </Typography>

          <Typography>
            <span>
              {intl.formatMessage({ id: 'components.limitationsDialog.dataSection.limitationsText' })}
            </span>
          </Typography>

          <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
            href={fileDownloadURL}
            disableElevation
          >
            <span>{intl.formatMessage({ id: 'common.downloadAllTables' })}</span>
            <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>
              {fileSize > 999 ? `[${intl.formatNumber((fileSize / 1024).toFixed(2))} MB]` : `[${intl.formatNumber(fileSize.toFixed(2))} KB]`}
            </span>
          </Button>
        </div>
      )}
    </Dialog>
  );
};

LimitationsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  hasDownload: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

LimitationsDialog.defaultProps = {
  hasDownload: false,
};
export default LimitationsDialog;
