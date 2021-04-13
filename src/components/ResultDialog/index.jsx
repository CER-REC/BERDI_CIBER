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
import styles from './styles';

const useStyles = makeStyles(styles);

const ResultDialog = ({ open, onClose, data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [canSeeMore, setCanSeeMore] = useState(false);

  useEffect(() => {
    if (open) {
      setCanSeeMore(false);
    }
  }, [open, setCanSeeMore]);

  const createEsaSection = (sections) => {
    if (sections.length < 260 || canSeeMore) {
      return (<Typography className={classes.esaSections}>{sections}</Typography>);
    }
    return (
      <>
        <Typography className={classes.esaSections}>
          {sections.substring(0, 260).concat(' ')}
        </Typography>
        <ButtonBase className={classes.seeMoreButton} onClick={() => setCanSeeMore(true)}>
          {intl.formatMessage({ id: 'components.resultDialog.seeMore' })}
        </ButtonBase>
      </>
    );
  };
  const handleViewClick = useCallback(() => {
    reportView(data.type, data.title);
    onClose();
  }, [data, onClose]);
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
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      {/* Header */}
      <Grid
        container
        item
        direction="column"
        className={classes.topRight}
      >
        <Grid item>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Preview */}
      <Grid className={classes.previewData}>
        <Typography component="strong">{intl.formatMessage({ id: 'components.resultDialog.previewTitle' })}</Typography>
        <Typography>{intl.formatMessage({ id: 'components.resultDialog.previewText' })}</Typography>
      </Grid>

      {/* Content */}
      <Grid
        container
        direction="column"
        className={classes.dialogContent}
      >
        <Grid item>
          <Typography variant="h6">
            {data.title}
          </Typography>
        </Grid>

        <Grid item>
          <Typography className={classes.esaSectionTitle}>
            {intl.formatMessage({ id: 'components.resultDialog.esaSectionTitle' })}
          </Typography>
          {createEsaSection(data.esaSections)}
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid
        container
        wrap="nowrap"
        className={classes.dialogFooter}
      >
        <Grid
          item
          spacing={1}
          container
          xs={4}
          className={classes.footerCounts}
        >
          <Grid item>
            <Typography>
              {data.type === 'FIGURE'
                ? intl.formatMessage({ id: 'components.resultDialog.figureOccursOnPage' })
                : intl.formatMessage({ id: 'components.resultDialog.tableOccursOnPage' })}
              <span>{data.pageNumber}</span>
            </Typography>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid
          item
          spacing={1}
          container
          wrap="nowrap"
          xs={8}
          justify="flex-end"
          className={classes.buttons}
        >

          {data.pdfURL && (
            <Grid item>
              <Button
                onClick={handleViewClick}
                color="primary"
                variant="outlined"
              >
                <Typography>
                  <a
                    className={classes.pdfLink}
                    href={data.pdfURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.resultDialog.viewOriginalDocument' })}
                  </a>
                </Typography>
              </Button>
            </Grid>
          )}

          {data.url && (
            <Grid item>
              <Button
                onClick={handleDownloadClick}
                color="primary"
                variant="contained"
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
      </Grid>
    </Dialog>
  );
};

ResultDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    esaSections: PropTypes.string,
    url: PropTypes.string,
    pdfURL: PropTypes.string,
    type: PropTypes.string,
    pageNumber: PropTypes.number,
  }),
};

ResultDialog.defaultProps = {
  data: null,
};

export default ResultDialog;
