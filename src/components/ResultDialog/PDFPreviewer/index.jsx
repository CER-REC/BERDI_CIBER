import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import LoadingIndicator from '../../LoadingIndicator';
import pdfFailLoadIcon from '../../../images/pdfFailLoad.svg';

const useStyles = makeStyles(() => ({
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
    borderColor: '#CCCCCC',
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
  const handleLoad = () => setLoading(false);
  const fullURL = `${pdfURL}#page=${pageNumber}&pagemode=thumbs&view=fitV&zoom=page-fit`;
  const ref = useRef();

  useEffect(() => {
    // Note that onError for the object tag doesn't attach
    if (ref.current) {
      ref.current.onerror = handleLoad;
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
        className={classes.object}
        onLoad={handleLoad}
        role="document"
      >
        {!isLoading && (
          <div className={classes.failureContainer}>
            <img alt="Pdf failed to load" src={pdfFailLoadIcon} />
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
