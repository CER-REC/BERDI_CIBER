import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import CartButton from '../CartButton';
import RateDataDialog from './RateDataDialog';
import ReportDataDialog from './ReportDataDialog';
import flag from '../../images/searchActionResults/flag.svg';
import leaf from '../../images/searchActionResults/leaf.svg';
import download from '../../images/searchActionResults/download.svg';
import { reportDownload, reportRateData, reportReportData } from '../../utilities/analytics';

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
    marginTop: topMargin
  },
}));

const SearchActionResults = ({ content }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [rateOpen, setRateOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const handleRateClose = () => setRateOpen(false);
  const handleRateClick = () => {
    setRateOpen(true);
    reportRateData();
  };
  const handleReportClose = () => setReportOpen(false);
  const handleReportClick = () => {
    setReportOpen(true);
    reportReportData();
  };

  return (
    <>
      <RateDataDialog
        open={rateOpen}
        onClose={handleRateClose}
        title={content.title}
        contentId={content.id}
      />
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
        onClick={handleRateClick}
        className={classes.searchActionButton}
        style={{ paddingLeft: '10px' }}
      >
        <img alt="a maple leaf" src={leaf} />
        {intl.formatMessage({ id: 'components.searchActionResults.rate' })}
      </Button>
      <Button
        variant="outlined"
        onClick={handleReportClick}
        className={classes.searchActionButton}
      >
        <img alt="a generic flag" src={flag} />
        {intl.formatMessage({
          id: 'components.searchActionResults.report'
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
