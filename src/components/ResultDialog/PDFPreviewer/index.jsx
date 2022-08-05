import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import LoadingIndicator from '../../LoadingIndicator';
import { API_HOST, applicationPath } from '../../../constants';
import pdfFailLoadIcon from '../../../images/pdfFailLoad.svg';

const pdfjsURL = `${API_HOST}/${applicationPath.en}/pdfjs/web/viewer.html?file=`;
// CER PDF are blocked by CORs for local development
const pdfViewerURL = process.env.NODE_ENV === 'development' ? '' : pdfjsURL;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    padding: '0 2.25em 0 2.25em',
  },
  failureContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.palette.grey.charcoal,
    borderStyle: 'solid',
    borderWidth: '2px',
    backgroundColor: '#FCFCFC',
  },
  failureMessage: {
    fontSize: '22px',
    color: '#054169',
    marginTop: '1em',
  },
}));

const PDFPreviewer = ({ pdfURL, pageNumber }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleLoad = () => setLoading(false);
  const fullURL = `${pdfViewerURL}${pdfURL}#page=${pageNumber}&pagemode=thumbs&view=fitV&zoom=page-fit`;
  const ref = useRef();

  useEffect(() => {
    // Note that onError for the object tag doesn't attach
    if (ref.current) {
      ref.current.onerror = () => {
        setHasError(true);
        handleLoad();
      };
    }
  });

  return (
    <div className={classes.root}>
      {isLoading && (
        <div style={{ height: '100%', display: 'flex' }}>
          <LoadingIndicator type="app" />
        </div>
      )}
      <object
        ref={ref}
        data={fullURL}
        width="100%"
        height="100%"
        type="application/pdf"
        onLoad={handleLoad}
        role="document"
      >
        {/*
          Chrome will reload the PDF if the fallback error is rendered in after the initial load
          because the PDF links are comprised of redirects
          so the final loaded link doesn't match the original ref
        */}
        {hasError && (
          <div className={classes.failureContainer}>
            <img alt="Sheet of paper with X over it" src={pdfFailLoadIcon} />
            <Typography className={classes.failureMessage}>
              {intl.formatMessage({ id: 'components.resultDialog.failedToLoad' })}
            </Typography>
          </div>
        )}
      </object>
    </div>
  );
};

PDFPreviewer.propTypes = {
  pdfURL: PropTypes.string,
  pageNumber: PropTypes.number,
};

PDFPreviewer.defaultProps = {
  pdfURL: '',
  pageNumber: -1,
};

export default PDFPreviewer;
