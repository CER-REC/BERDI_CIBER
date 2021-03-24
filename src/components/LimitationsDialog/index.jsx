import React from 'react';
import { Button, Dialog, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

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
      background: '#BBEBFF',
      paddingLeft: 0,
      paddingRight: '0.5em',
    },
    '& span': {
      display: 'block',
      padding: '0.5em 0',
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
          {intl.formatMessage({ id: 'components.limitationsDialog.termsTitle.title' })}
        </Typography>
        <Typography>
          {
            intl.formatMessage(
              { id: 'components.limitationsDialog.termsTitle.body' },
              {
                link: (
                  <a href="https://www.cer-rec.gc.ca/">
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
      { /* TODO: Add data download */ }
      { hasDownload && 'Download' }
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
