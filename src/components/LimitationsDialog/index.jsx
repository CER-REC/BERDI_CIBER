import { Button, Dialog, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
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
  title: {
    backgroundColor: theme.palette.blue.dark,
    color: theme.palette.common.white,
    padding: '0.8em',
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
    '& mark': {
      background: theme.palette.blue.inline,
      paddingLeft: 0,
      paddingRight: '0.5em',
      fontFamily: 'Courier',
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
  footer: {
    padding: '1.5em',
    textAlign: 'right',
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
      <Typography classes={{ root: classes.title }} variant="h6">
        {intl.formatMessage({ id: 'components.limitationsDialog.title' })}
      </Typography>
      <div className={classes.body}>
        <Typography component="h6">
          {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.title' })}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.body' })}
        </Typography>
        <Typography component="h6">
          {intl.formatMessage({ id: 'common.termsAndConditions' })}
        </Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.limitationsDialog.termsTitle.body' },
              {
                link: (
                  <a
                    href={intl.formatMessage({ id: 'common.limitationsURL' })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.limitationsDialog.termsTitle.link' })}
                  </a>
                ),
              },
            )
          }
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
                  <span>
                    <mark>
                      {intl.formatMessage({ id: 'components.limitationsDialog.citation.cite' })}
                    </mark>
                  </span>
                ),
              },
            )
          }
        </Typography>
      </div>
      { hasDownload
      && (
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
      ) }
      <hr />
      <div className={classes.footer}>
        <Button
          color="primary"
          variant="contained"
          onClick={onClose}
          disableElevation
        >
          {intl.formatMessage({ id: 'components.limitationsDialog.close' })}
        </Button>
      </div>
    </Dialog>
  );
};

LimitationsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  hasDownload: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LimitationsDialog;
