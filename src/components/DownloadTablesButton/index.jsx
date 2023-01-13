import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import downloadIcon from '../../images/Download.svg';

const dataFontSize = '1.1em';

const useStyles = makeStyles((theme) => ({
  root: { padding: '0.3em 3em' },
  data: {
    fontSize: dataFontSize,
    fontWeight: 'bold',
    height: dataFontSize,
    lineHeight: '100%',
    marginLeft: '0.5em',
  },
  disabled: { ...theme.mixins.disabled },
  icon: {
    paddingRight: '0.5em',
    maxWidth: '1.2em',
  },
}));

const DownloadTablesButton = ({ fileSize, href, disabled, onClick }) => {
  const intl = useIntl();
  const classes = useStyles();
  const fileSizeMB = fileSize / 1024;
  const fileSizeLabel = (fileSizeMB >= 1)
    ? `${intl.formatNumber(fileSizeMB.toFixed(2))} ${intl.formatMessage({ id: 'components.downloadTablesButton.megabytes' })}`
    : `${intl.formatNumber(fileSize.toFixed(2))} ${intl.formatMessage({ id: 'components.downloadTablesButton.kilobytes' })}`;

  return (
    <Button
      color="primary"
      variant="contained"
      className={classes.root}
      classes={{ disabled: classes.disabled }}
      href={href}
      disabled={disabled}
      onClick={onClick}
    >
      <img src={downloadIcon} alt={intl.formatMessage({ id: 'common.downloadAltText' })} className={classes.icon} />
      <span>{intl.formatMessage({ id: 'components.downloadTablesButton.label' })}</span>
      <span className={classes.data}>
        {fileSizeLabel}
      </span>
    </Button>
  );
};

DownloadTablesButton.propTypes = {
  fileSize: PropTypes.number,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

DownloadTablesButton.defaultProps = {
  fileSize: 0,
  href: '',
  disabled: false,
};

export default DownloadTablesButton;
