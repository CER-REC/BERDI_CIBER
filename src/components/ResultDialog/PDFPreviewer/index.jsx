import React, { useState } from 'react';
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
  object: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const PDFPreviewer = ({ pdfURL, pageNumber }) => {
  pdfURL = 'force failure';
  const classes = useStyles();
  const intl = useIntl();
  const [isLoading, setLoading] = useState(true);
  const handleLoad = () => setLoading(false);
  const fullURL = `${pdfURL}#page=${pageNumber}&pagemode=thumbs&view=fitV&zoom=page-fit`;

  return (
    <div className={classes.root}>
      {isLoading && (
        <div style={{ height: '100%', display: 'flex' }}>
          <LoadingIndicator type="app" />
        </div>
      )}
      <object
        data={fullURL}
        width="100%"
        height="100%"
        type="application/pdf"
        typemustmatch="true"
        className={classes.object}
        onLoad={handleLoad}
      >
        {!isLoading && (
          <>
            <img alt="Icon depicting pdf load failure." src={pdfFailLoadIcon} />
            <Typography>
              {intl.formatMessage({ id: 'components.resultDialog.failedToLoad' })}
            </Typography>
          </>
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
