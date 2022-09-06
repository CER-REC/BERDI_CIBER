import { makeStyles, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import CERDialog from '../CERDialog';
import useAPI from '../../hooks/useAPI';
import { reportDownload, reportSection } from '../../utilities/analytics';
import useConfig from '../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  body: {
    '& h6': {
      fontWeight: 700,
    },
    '& p': {
      margin: 0,
      paddingTop: '1em',
      lineHeight: 1.65,
      '&:not(:last-child)': { paddingBottom: '2em' },
    },
  },
  downloadSection: {
    borderColor: theme.palette.blue.dark,
    borderStyle: 'solid',
    borderWidth: '2px',
    marginTop: '1.5em',
    padding: '1.5em',
    '& p': {
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
    display: 'block',
    fontWeight: 500,
    padding: '0.5em 0',
    fontFamily: 'Roboto Mono',
  },
}));

const LimitationsDialog = ({ open, hasDownload, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const { fileSize, csvCount, tableCount, fileDownloadURL } = useAPI();
  const handleClick = useCallback(() => {
    reportDownload(intl.messages['common.downloadAllTables']);
    onClose();
  }, [intl, onClose]);

  const handleMethodsClick = () => {
    reportSection('methods');
    configDispatch({ type: 'page/changed', payload: 'methods' });
  };

  return (
    <CERDialog
      title={intl.formatMessage({ id: 'components.limitationsDialog.title' })}
      open={open}
      onClose={onClose}
    >
      <div className={classes.body}>
        <Typography component="h6">
          {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.title' })}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.body' }, {
            link: (
              <Button color="secondary" onClick={handleMethodsClick} disableRipple>
                {intl.formatMessage({ id: 'components.limitationsDialog.accuracy.link' })}
              </Button>
            ),
          })}
        </Typography>

        {intl.locale === 'fr' && (
        <Typography style={{ paddingTop: 0 }} variant="body2">
          {intl.formatMessage({ id: 'common.frenchDisclaimerLong' })}
        </Typography>
        )}
        <Typography component="h6">
          {intl.formatMessage({ id: 'components.limitationsDialog.usage.title' })}
        </Typography>
        <Typography style={{ paddingBottom: '1em' }}>
          {intl.formatMessage({ id: 'components.limitationsDialog.usage.header' })}
        </Typography>
        <ul style={{ lineHeight: 1.65 }}>
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
          >
            <span>{intl.formatMessage({ id: 'common.downloadAllTables' })}</span>
            <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>
              {fileSize > 999 ? `[${intl.formatNumber((fileSize / 1024).toFixed(2))} MB]` : `[${intl.formatNumber(fileSize.toFixed(2))} KB]`}
            </span>
          </Button>
        </div>
      )}
    </CERDialog>
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
