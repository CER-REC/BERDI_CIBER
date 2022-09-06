import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import CartButton from '../CartButton';
import ReportDataDialog from './ReportDataDialog';
import flag from '../../images/searchActionResults/flag.svg';
import download from '../../images/searchActionResults/download.svg';
import { reportDownload, reportReportData } from '../../utilities/analytics';

const topMargin = '0.5em';

const useStyles = makeStyles((theme) => ({
  searchResultButton: {
    justifyContent: 'left',
    width: '100%',
    marginTop: topMargin,
    borderColor: theme.palette.teal.blue,
    color: theme.palette.teal.blue,
  },
  hrefButton: {
    '&:hover, &:focus, &:active': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  hr: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.teal.blue} 50%, transparent 0%)`,
    backgroundSize: '10px 1px',
    border: 'none',
    height: '1px',
    padding: '0',
    margin: '0.5em 0 0 0',
  },
  svgIcon: {
    filter: 'brightness(0) saturate(100%) invert(17%) sepia(23%) saturate(5458%) hue-rotate(181deg) brightness(96%) contrast(94%)',
    paddingLeft: '0.5em',
    marginRight: '0.5em',
  },
}));

const SearchActionResults = ({ content }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [reportOpen, setReportOpen] = useState(false);

  const handleReportClose = () => setReportOpen(false);
  const handleReportClick = () => {
    setReportOpen(true);
    reportReportData();
  };

  return (
    <>
      <ReportDataDialog
        open={reportOpen}
        onClose={handleReportClose}
        title={content.title}
        contentId={content.id}
      />
      <CartButton data={content} />
      <Button
        aria-label={intl.formatMessage({ id: 'components.searchActionResults.download' })}
        href={content.url}
        variant="outlined"
        onClick={() => reportDownload(content.title)}
        className={`${classes.searchResultButton} ${classes.hrefButton}`}
        style={{ visibility: content.url === null ? 'hidden' : 'visible' }}
      >
        <img alt={intl.formatMessage({ id: 'common.downloadAltText' })} src={download} className={classes.svgIcon} />
        {intl.formatMessage({ id: 'components.searchActionResults.download' })}
      </Button>
      <hr className={classes.hr} />
      <Button
        aria-label={intl.formatMessage({ id: 'components.searchActionResults.report' })}
        variant="outlined"
        onClick={handleReportClick}
        className={classes.searchResultButton}
      >
        <img alt={intl.formatMessage({ id: 'components.searchActionResults.reportAltText' })} src={flag} className={classes.svgIcon} />
        {intl.formatMessage({ id: 'components.searchActionResults.report' })}
      </Button>
    </>
  );
};

SearchActionResults.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default SearchActionResults;
