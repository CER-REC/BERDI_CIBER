import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ButtonBase,
  Dialog,
  Grid,
  Icon,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import downloadIcon from '../../images/Download.svg';
import { reportDownload, reportView } from '../../utilities/analytics';
import DataNotice from './DataNotice';
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

  const handleDownloadClick = useCallback(() => {
    reportDownload(data.title);
    onClose();
  }, [data, onClose]);

  if (!data) {
    return null;
  }

  return (
    <Dialog
      className="ResultDialog"
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      data-testid="resultDialog"
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
        pageNumber={data.pageNumber}
      />

      {/* Content */}
      <Grid
        container
        direction="column"
        className={classes.dialogContent}
      >
        <Grid item container>
          <Typography className={classes.dialogProject}>
            {data.project}
          </Typography>
        </Grid>

        <Grid item style={{ paddingBottom: '20px' }}>
          {createTitleSection(data.title)}
        </Grid>

        {(data.type === 'TABLE') && !data.url && <DataNotice />}

        <Grid item container>
          {/* Data labels */}
          <Grid item container direction="column" className={classes.dialogDataContainer}>
            <Typography className={classes.dialogLabel}>
              {intl.formatMessage({ id: 'components.resultDialog.foundOnPage' })}
            </Typography>
            <Typography className={classes.dialogLabel}>
              {intl.formatMessage({ id: 'components.resultDialog.originalPDF' })}
            </Typography>
            <Typography className={classes.dialogLabel}>
              {intl.formatMessage({ id: 'components.resultDialog.esaFolder' })}
            </Typography>
            <Typography className={classes.dialogLabel}>
              {intl.formatMessage({ id: 'components.resultDialog.projectFolder' })}
            </Typography>
            <Typography className={classes.dialogLabel}>
              {intl.formatMessage({ id: 'components.resultDialog.finalDecision' })}
            </Typography>
          </Grid>

          {/* Data items */}
          <Grid item container direction="column" className={classes.dialogDataContainer}>
            <Typography style={{ fontSize: 16 }}>
              {`${data.pageNumber} of ${data.pageCount}`}
            </Typography>
            <a href={data.pdfURL} alt="pdfLink" target="_blank" rel="noopener noreferrer" onClick={handleViewClick}>{data.pdfName}</a>
            <a href={data.esaFolderURL} alt="esaFolderLink" target="_blank" rel="noopener noreferrer" onClick={handleViewClick}>{data.esaFolderURL}</a>
            <a href={data.projectFolderURL} alt="projectFolderLink" target="_blank" rel="noopener noreferrer" onClick={handleViewClick}>{data.projectFolderURL}</a>
            {(data.finalDecisionURL
              && <a href={data.finalDecisionURL} alt="finalDecisionLink" target="_blank" rel="noopener noreferrer" onClick={handleViewClick} className={classes.finalDecision}>{data.finalDecisionURL}</a>)
              || (
                <Typography className={classes.finalDecision} style={{ fontSize: 16 }}>
                  {intl.formatMessage({ id: 'components.resultDialog.pending' })}
                </Typography>
              )}
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid
        container
        wrap="nowrap"
        className={classes.dialogFooter}
      >
        {data.url && (
          <Grid
            item
            className={classes.dialogFooterButtons}
          >
            <Button
              onClick={handleDownloadClick}
              color="primary"
              variant="contained"
              disableElevation
              data-testid="downloadButton"
            >
              <Icon className={classes.downloadIcon}>
                <img
                  src={downloadIcon}
                  alt="download button"
                />
              </Icon>
              <Typography>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white' }}
                >
                  {data.type === 'FIGURE'
                    ? intl.formatMessage({ id: 'components.resultDialog.downloadFigure' })
                    : intl.formatMessage({ id: 'components.resultDialog.downloadTable' })}
                </a>
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
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
    pageNumber: PropTypes.number,
    pageCount: PropTypes.number,
    project: PropTypes.string,
    esaFolderURL: PropTypes.string,
    projectFolderURL: PropTypes.string,
    finalDecisionURL: PropTypes.string,
  }),
};

ResultDialog.defaultProps = {
  data: null,
};

export default ResultDialog;
