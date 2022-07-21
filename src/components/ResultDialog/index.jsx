import React, { useCallback, useEffect, useState } from 'react';
import {
  ButtonBase,
  Dialog,
  Grid,
  IconButton,
  Typography,
  makeStyles,
  Slide,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { reportView } from '../../utilities/analytics';
import CartButton from '../CartButton';
import styles from './styles';
import PDFPreviewer from './PDFPreviewer';

const useStyles = makeStyles(styles);

const ResultDialog = ({ open, onClose, data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [canSeeMoreTitles, setCanSeeMoreTitles] = useState(false);

  useEffect(() => {
    if (open) {
      setCanSeeMoreTitles(false);
    }
  }, [open, setCanSeeMoreTitles]);

  // TODO: make this a more generic function to be used whenever a see more button is needed.
  const createTitleSection = (title) => {
    if (title.length < 150) {
      return (
        <Typography className={classes.dialogTitle}>{title}</Typography>
      );
    }
    if (title.length >= 150 && canSeeMoreTitles) {
      return (
        <>
          <Typography className={classes.dialogTitle}>{title}</Typography>
          <ButtonBase
            className={classes.seeMoreButton}
            onClick={() => setCanSeeMoreTitles(false)}
          >
            {intl.formatMessage({ id: 'components.resultDialog.seeLess' })}
          </ButtonBase>
        </>
      );
    }
    return (
      <>
        <Typography className={classes.dialogTitle}>
          {title.substring(0, 150).concat('...')}
        </Typography>
        <ButtonBase
          className={classes.seeMoreButton}
          onClick={() => setCanSeeMoreTitles(true)}
        >
          {intl.formatMessage({ id: 'components.resultDialog.seeMore' })}
        </ButtonBase>
      </>
    );
  };

  const handleViewClick = useCallback(() => {
    reportView(data.type, data.title);
  }, [data]);

  const getDataAnchorElement = (href) => <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleViewClick}>{href}</a>;

  if (!data) {
    return null;
  }

  const createTableRow = (label, dataItem) => (
    <tbody>
      <tr>
        <td>
          <Typography className={classes.dialogLabel}>
            {intl.formatMessage({ id: `components.resultDialog.${label}` })}
          </Typography>
        </td>
        <td>
          <Typography>
            {dataItem}
          </Typography>
        </td>
      </tr>
    </tbody>
  );

  return (
    <Dialog
      className="ResultDialog"
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'right', timeout: 300 }}
    >
      {/* Header */}
      <Grid
        container
        item
        direction="column"
        className={classes.dialogHeader}
      >
        <Grid item>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Preview */}
      <PDFPreviewer
        pdfURL={data.pdfURL}
        pageNumber={data.pdfPageNumber}
      />

      {/* Content */}
      <Grid container direction="column" className={classes.dialogContent}>
        <Grid item container>
          <Typography className={classes.dialogProject}>
            {intl.formatMessage({ id: 'components.resultDialog.title' }, {
              shortName: (<strong style={{fontWeight: '700'}}>{data.application.shortName}</strong>)
            })}
          </Typography>
        </Grid>

        <Grid container justify="space-between" style={{ paddingBottom: '20px' }}>
          <Grid item xs={8}>{createTitleSection(data.title)}</Grid>
          <Grid item xs={2}><CartButton data={data} /></Grid>
        </Grid>

        <Grid item container>
          <table className={classes.dialogDataContainer}>
            {createTableRow('foundOnPage', data.pdfPageNumber)}
            <a href={data.pdfURL} target="_blank" rel="noopener noreferrer" onClick={handleViewClick}>Open original PDF</a>
            {createTableRow('originalPDF', getDataAnchorElement(data.pdfURL))}
            {createTableRow('esaFolder', getDataAnchorElement(data.esaFolderURL))}
            {createTableRow('projectFolder', getDataAnchorElement(data.application.applicationURL))}
            <tbody>
              <tr>
                <td>
                  <Typography className={classes.dialogLabel}>
                    {intl.formatMessage({ id: 'components.resultDialog.finalDecision' })}
                  </Typography>
                </td>
                <td>
                  {(!data.application.finalDecisionURL && (
                    <Typography className={classes.finalDecision}>
                      {intl.formatMessage({ id: 'components.resultDialog.notApplicable' })}
                    </Typography>
                  )) || (data.application.finalDecisionURL.toLowerCase() === 'pending' && (
                    <Typography className={classes.finalDecision}>
                      {intl.formatMessage({ id: 'components.resultDialog.pending' })}
                    </Typography>
                  )) || (getDataAnchorElement(data.application.finalDecisionURL))}
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid
        container
        wrap="nowrap"
        className={classes.dialogFooter}
      />
    </Dialog>
  );
};

ResultDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    pdfName: PropTypes.string,
    pdfURL: PropTypes.string,
    type: PropTypes.string,
    pdfPageNumber: PropTypes.number,
    application: PropTypes.shape({
      consultants: PropTypes.string,
      filingDate: PropTypes.string,
      name: PropTypes.string,
      applicationURL: PropTypes.string,
      finalDecisionURL: PropTypes.string,
    }),
    esaFolderURL: PropTypes.string,
  }),
};

ResultDialog.defaultProps = {
  data: null,
};

export default ResultDialog;
