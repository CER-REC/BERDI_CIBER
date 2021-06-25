import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: '94%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#525659',
  },
}));

const PDFPreviewer = ({ pdfURL, pageNumber }) => {
  const classes = useStyles();
  const fullURL = `${pdfURL}#page=${pageNumber}#view=FitV`;
  return (
    <object
      className={classes.root}
      data={fullURL}
      type="application/pdf"
    >
      pdf-content
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
