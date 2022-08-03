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

const useStyles = makeStyles(() => ({
  searchActionButton: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: topMargin,
  },
  hr: {
    width: '100%',
    borderTop: '1px dotted',
    margin: '0',
    marginTop: topMargin,
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
        href={content.url}
        variant="outlined"
        onClick={() => reportDownload(content.title)}
        className={classes.searchActionButton}
        style={{ visibility: content.url === null ? 'hidden' : 'visible' }}
      >
        <img alt="a down arrow" src={download} />
        {intl.formatMessage({
          id: 'components.searchActionResults.download',
        })}
      </Button>
      <hr className={classes.hr} />
      <Button
        variant="outlined"
        onClick={handleReportClick}
        className={classes.searchActionButton}
      >
        <img alt="a generic flag" src={flag} />
        {intl.formatMessage({
          id: 'components.searchActionResults.report',
        })}
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
