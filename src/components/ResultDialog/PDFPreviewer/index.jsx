import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

const PDFPreviewer = ({ pdfURL, pageNumber }) => {
  const classes = useStyles();
  const fullURL = `${pdfURL}#page=${pageNumber}`;
  return (
    // TODO: <object><embed>, or just <embed>? Or just <object>?
    <object
      className={classes.root}
      data={fullURL}
      type="application/pdf"
    >
      <embed
        src={fullURL}
        type="application/pdf"
      />
    </object>
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
