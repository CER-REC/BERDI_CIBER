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

import OpenInNew from '@material-ui/icons/OpenInNew';
import { reportView } from '../../utilities/analytics';
import styles from './styles';
import PDFPreviewer from './PDFPreviewer';
import SearchActionResults from '../SearchActionResults';

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

  const getExternalLinkElement = (label, href) => (
    <Typography>
      <a href={href} target="_blank" rel="external noreferrer" onClick={handleViewClick}>
        {intl.formatMessage({ id: `components.resultDialog.${label}` })}
        <span><OpenInNew className={classes.external} fontSize="small" /></span>
      </a>
    </Typography>
  );

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
              shortName: (<strong style={{ fontWeight: '700' }}>{data.application.shortName}</strong>),
            })}
          </Typography>
        </Grid>

        <Grid container justify="space-between" style={{ paddingBottom: '20px' }}>
          <Grid item xs={8}>
            {createTitleSection(data.title)}
            <Typography className={classes.dialogLabel}>
              <strong>{intl.formatMessage({ id: 'components.resultDialog.foundOnPage' })}</strong>
              {data.pdfPageNumber}
            </Typography>
            <a href={data.pdfURL} target="_blank" rel="noopener noreferrer" onClick={handleViewClick}>
              {intl.formatMessage({ id: 'components.resultDialog.originalPDF' })}
            </a>
          </Grid>
          <SearchActionResults content={data} />
        </Grid>

        <Grid item container>
          <Typography>{intl.formatMessage({ id: 'components.resultDialog.externalLinksTitle' })}</Typography>
          <Grid item container>
            {getExternalLinkElement('esaFolder', data.esaFolderURL)}
            {getExternalLinkElement('projectFolder', data.application.applicationURL)}
            {
              (!data.application.finalDecisionURL && (
                <Typography>
                  {intl.formatMessage({ id: 'components.resultDialog.finalDecisionNotApplicable' })}
                </Typography>
              )) || (data.application.finalDecisionURL.toLowerCase() === 'pending' && (
                <Typography>
                  {intl.formatMessage({ id: 'components.resultDialog.finalDecisionPending' })}
                </Typography>
              )) || getExternalLinkElement('viewFinalDecision', data.application.finalDecisionURL)
            }
          </Grid>
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
      shortName: PropTypes.string,
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
