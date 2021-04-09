import React, { useCallback } from 'react';
import { Grid, makeStyles, Typography, Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import downloadIcon from '../../images/Download.svg';
import { reportDownload, reportView } from '../../utilities/analytics';
import styles from './TreeMapStyles';

const useStyles = makeStyles(styles);

const TreeMapDialog = ({ open, handleClose, leafData }) => {
  const classes = useStyles();
  const intl = useIntl();
  const handleViewClick = useCallback(() => {
    reportView('REGDOCS', leafData.name);
    handleClose();
  }, [leafData, handleClose]);
  const handleDownloadClick = useCallback(() => {
    reportDownload(leafData.name);
    handleClose();
  }, [leafData, handleClose]);

  if (!leafData) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      {/* Header */}
      <Grid container className={classes.dialogHeader}>
        <Grid
          container
          item
          direction="column"
          xs={9}
          style={{ paddingTop: '20px' }}
        >
          <Grid item>
            <Typography variant="h5">
              {leafData.filingDate.substring(0, 4)}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h5" style={{ textTransform: 'uppercase' }}>
              {leafData.shortName}
            </Typography>
          </Grid>

        </Grid>

        <Grid
          container
          item
          xs={3}
          direction="column"
          className={classes.topRight}
        >
          <Grid item>
            <IconButton aria-label="close" style={{ fill: 'black' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <Typography
              component="span"
              className={classes.statusIndicator}
            >
              {intl.formatMessage({ id: `common.statuses.${leafData.status}` }) }
            </Typography>
          </Grid>

        </Grid>
      </Grid>

      {/* Content */}
      <Grid container direction="column" className={classes.dialogContent}>
        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.fullProjectName' })}: `}</span>
            {leafData.name}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.applicationType' })}: `}</span>
            {intl.formatMessage({ id: `common.projects.${leafData.type}` })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.commodity' })}: `}</span>
            {intl.formatMessage({ id: `common.commodities.${leafData.commodity}` })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.consultants' })}: `}</span>
            {leafData.consultants}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.companyName' })}: `}</span>
            {leafData.companyName}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.hearingOrder' })}: `}</span>
            {leafData.hearingOrder}
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            <span>{`${intl.formatMessage({ id: 'common.filingDate' })}: `}</span>
            {new Date(leafData.filingDate).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid container wrap="nowrap" className={classes.dialogFooter}>

        {/* Table / Figure Counts */}
        <Grid item spacing={1} container xs={4} className={classes.footerCounts}>

          <Grid item>
            <Typography>
              <span>{`${leafData.tableCount} `}</span>
              { intl.formatMessage({ id: 'components.treeMap.tableCount' }, { tables: leafData.tableCount })}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.footerFigures}>
              {`${leafData.figureCount} `}
              {intl.formatMessage({ id: 'components.treeMap.figureCount' }, { figures: leafData.figureCount })}
            </Typography>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid item spacing={1} container wrap="nowrap" xs={8} justify="flex-end">

          {leafData.regdocsURL && (
          <Grid item>
            <Button
              onClick={handleViewClick}
              color="primary"
              variant="outlined"
            >
              <Typography>
                <a
                  className={classes.folderLink}
                  href={leafData.regdocsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({ id: 'components.treeMap.REGDOCSButton' })}
                </a>
              </Typography>
            </Button>
          </Grid>
          )}

          {leafData.url && (
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
                  href={leafData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white' }}
                >
                  {intl.formatMessage({ id: 'components.treeMap.tablesButton' })}
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

export default TreeMapDialog;

TreeMapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  leafData: PropTypes.shape({
    filingDate: PropTypes.string,
    shortName: PropTypes.string,
    url: PropTypes.string,
    regdocsURL: PropTypes.string,
    figureCount: PropTypes.number,
    tableCount: PropTypes.number,
    hearingOrder: PropTypes.string,
    companyName: PropTypes.string,
    name: PropTypes.string,
    consultants: PropTypes.string,
    commodity: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
  }),
};

TreeMapDialog.defaultProps = {
  leafData: null,
};
