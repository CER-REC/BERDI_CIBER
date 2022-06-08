import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import download from '../../../images/listPanel/download.svg';
import flag from '../../../images/listPanel/flag.svg';
import leaf from '../../../images/listPanel/leaf.svg';
import ellipsisIcon from '../../../images/listPanel/ellipsis.svg';
import { reportDownload, reportRateData, reportReportData } from '../../../utilities/analytics';
import RateDataDialog from '../RateDataDialog';
import ReportDataDialog from '../ReportDataDialog';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: '1em',
    marginBottom: '1em',
    '&.Mui-focusVisible': { boxShadow: `0 0 0 8px ${theme.palette.action.focus}` },
  },
  menu: {
    marginTop: '0.5em',
    '& img': {
      paddingRight: '0.5em',
    },
    '& ul': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& li': {
      paddingRight: '2em',
    },
    '& .MuiPaper-rounded': {
      borderRadius: 0,
      boxShadow: 'none',
      filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.25))',
      border: '1px solid #D0CDCD',
    },
    paddingTop: 0,
    paddingBottom: 0,
  },
  border: {
    borderStyle: 'solid none none none',
    borderColor: '#7B7E81',
    borderWidth: '1px',
  },
}));

const EllipsisButton = ({ downloadURL, title, contentId }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);
  const [rateOpen, setRateOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRateClose = () => setRateOpen(false);
  const handleRateClick = () => {
    handleClose();
    setRateOpen(true);
    reportRateData();
  };
  const handleReportClose = () => setReportOpen(false);
  const handleReportClick = () => {
    handleClose();
    setReportOpen(true);
    reportReportData();
  };

  return (
    <>
      <RateDataDialog
        open={rateOpen}
        onClose={handleRateClose}
        title={title}
        contentId={contentId}
      />
      <ReportDataDialog
        open={reportOpen}
        onClose={handleReportClose}
        title={title}
        contentId={contentId}
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleRateClick} style={{ paddingLeft: '10px' }}>
          <img alt="a maple leaf" src={leaf} />
          {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.rate' })}
        </MenuItem>
        <MenuItem onClick={handleReportClick} className={classes.border}>
          <img alt="a generic flag" src={flag} />
          {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.report' })}
        </MenuItem>

        {downloadURL && (
          <a role="button" tabIndex="0" href={downloadURL} style={{ color: 'unset', textDecoration: 'none' }} onClick={() => reportDownload(title)}>
            <MenuItem onClick={handleClose} className={classes.border}>
              <img alt="a down arrow" src={download} />
              {intl.formatMessage({ id: 'components.listPanel.ellipsisButton.download' })}
            </MenuItem>
          </a>
        )}
      </Menu>

      <Button color="primary" className={classes.button} onClick={handleClick} disableFocusRipple>
        <img alt="Ellipsis" src={ellipsisIcon} />
      </Button>
    </>
  );
};

export default EllipsisButton;

EllipsisButton.propTypes = {
  downloadURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};

EllipsisButton.defaultProps = {
  downloadURL: null,
};
