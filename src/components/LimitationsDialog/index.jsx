import { makeStyles, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import CERDialog from '../CERDialog';
import Citation from '../Citation';
import useAPI from '../../hooks/useAPI';
import { reportDownload, reportSection } from '../../utilities/analytics';
import useConfig from '../../hooks/useConfig';
import downloadIcon from '../../images/Download.svg';
import LegalAgreeCheckbox from '../LegalAgreeCheckbox';
import useConfirmation from '../../hooks/useConfirmation';

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
      '&:not(:first-child)': { paddingTop: '1em' },
    },
    '& a:visited': {
      color: 'white',
    },
  },
  list: {
    marginTop: '1em',
  },
  footerDownloadButton: {
    marginTop: '1.5em',
    backgroundColor: theme.palette.cart.dark,
    padding: '0.3em 3em',
  },
  disabledButton: {
    ...theme.mixins.disabled,
  },
  footerDownloadButtonIcon: {
    paddingRight: '0.5em',
    maxWidth: '1.2em',
  },
}));

const LimitationsDialog = ({ open, hasDownload, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const { fileSize, tableCount, fileDownloadURL } = useAPI();
  const { hasConfirmation, setHasConfirmation } = useConfirmation();

  const toggleChecked = () => setHasConfirmation(!hasConfirmation);

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
        <Citation />
      </div>
      { hasDownload && (
        <div className={classes.downloadSection}>
          <Typography>
            {intl.formatMessage({ id: 'components.limitationsDialog.dataSection.zipText' })}
          </Typography>
          <ul className={classes.list}>
            <li>
              {intl.formatMessage(
                { id: 'components.limitationsDialog.dataSection.countsText' },
                {
                  tableCount: intl.formatNumber(tableCount),
                },
              )}
            </li>
            <li>
              {intl.formatMessage({ id: 'components.limitationsDialog.dataSection.parentText' })}
            </li>
          </ul>

          <Typography style={{ marginBottom: '0.8em' }}>
            {intl.formatMessage({ id: 'components.limitationsDialog.dataSection.limitationsText' })}
          </Typography>

          <LegalAgreeCheckbox
            isChecked={hasConfirmation}
            toggleChecked={toggleChecked}
          />
          <div style={{ textAlign: 'center' }}>
            <Button
              color="primary"
              variant="contained"
              disabled={!hasConfirmation}
              className={classes.footerDownloadButton}
              classes={{ disabled: classes.disabledButton }}
              onClick={handleClick}
              href={fileDownloadURL}
            >
              <img src={downloadIcon} alt={intl.formatMessage({ id: 'common.downloadAltText' })} className={classes.footerDownloadButtonIcon} />
              <span>{intl.formatMessage({ id: 'common.downloadAllTables' })}</span>
              <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>
                {fileSize > 999 ? `[${intl.formatNumber((fileSize / 1024).toFixed(2))} MB]` : `[${intl.formatNumber(fileSize.toFixed(2))} KB]`}
              </span>
            </Button>
          </div>
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
