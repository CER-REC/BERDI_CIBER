import { makeStyles, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import CERDialog from '../CERDialog';
import Citation from '../Citation';
import DownloadTablesButton from '../DownloadTablesButton';
import useAPI from '../../hooks/useAPI';
import { reportDownload, reportSection } from '../../utilities/analytics';
import useConfig from '../../hooks/useConfig';
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
  downloadFooter: {
    paddingTop: '1.5em',
    textAlign: 'center',
  },
  list: {
    marginTop: '1em',
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
          <div className={classes.downloadFooter}>
            <DownloadTablesButton
              fileSize={fileSize}
              href={fileDownloadURL}
              disabled={!hasConfirmation}
              onClick={handleClick}
            />
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
