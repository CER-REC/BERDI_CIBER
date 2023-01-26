import React, { useCallback } from 'react';
import { Button, Dialog, Grid, Icon, IconButton, Typography, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import downloadIcon from '../../images/Download.svg';
import { reportDownload, reportView } from '../../utilities/analytics';
import styles from './styles';
import getProjectTypeLabel from '../../utilities/getProjectTypeLabel';

const useStyles = makeStyles(styles);

const ApplicationDialog = ({ data, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const handleViewClick = useCallback(() => {
    reportView('REGDOCS', data.name);
    onClose();
  }, [data, onClose]);
  const handleDownloadClick = useCallback(() => {
    reportDownload(data.name);
    onClose();
  }, [data, onClose]);
  const createDialogField = (title, content) => (
    <Typography key={title}>
      <span>{intl.formatMessage({ id: title })}</span>
      {content}
    </Typography>
  );

  if (!data) {
    return null;
  }

  const dialogFields = [{
    label: 'common.fullProjectName',
    content: data.name,
  }, {
    label: 'common.projectType',
    content: intl.formatMessage({ id: getProjectTypeLabel(data.type, new Date(data.filingDate)) }),

  }, {
    label: 'common.commodity',
    content: intl.formatMessage({ id: `api.commodities.${data.commodity}` }),
  }, {
    label: 'common.consultants',
    content: data.consultants,
  }, {
    label: 'common.companyName',
    content: data.companyName,
  }, {
    label: 'common.hearingOrder',
    content: data.hearingOrder,
  }, {
    label: 'common.filingDate',
    content: new Date(data.filingDate).toLocaleDateString(),
  }];

  return (
    <Dialog
      className="ApplicationDialog"
      onClose={onClose}
      maxWidth="md"
      open
      fullWidth
    >
      {console.log(data)}
      <Grid container>
        {/* Left Side */}
        <Grid item xs={10} className={classes.left}>
          <Typography variant="h5">
            {data.shortName}
          </Typography>

          {dialogFields.map((item) => createDialogField(item.label, item.content))}
        </Grid>

        {/* Right Side */}
        <Grid
          xs={2}
          item
          container
          direction="column"
          alignContent="flex-end"
          className={classes.right}
        >
          <Grid item>
            <IconButton aria-label={intl.formatMessage({ id: 'common.closeAltText' })} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <Typography
              component="span"
              className={classes.statusIndicator}
            >
              {intl.formatMessage({ id: `api.statuses.${data.status}` })}
            </Typography>
          </Grid>
        </Grid>

      </Grid>

      {/* Footer */}
      <Grid container wrap="nowrap" justify="space-around" className={classes.footer}>
        {/* Table / Figure Counts */}
        <Grid item container spacing={1} xs={6} alignItems="center" className={classes.counts}>
          <Grid item>
            <Typography>
              <span>{`${intl.formatNumber(data.tableCount)} `}</span>
              {intl.formatMessage({ id: 'common.tableCount' }, { tables: data.tableCount })}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.italicized}>
              {`${intl.formatNumber(data.figureCount)} `}
              {intl.formatMessage({ id: 'common.figureCount' }, { figures: data.figureCount })}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.italicized}>
              {`${intl.formatNumber(data.alignmentSheetCount)} `}
              {intl.formatMessage({ id: 'common.alignmentSheetCount' }, { alignmentSheets: data.alignmentSheetCount })}
            </Typography>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid item spacing={1} container wrap="nowrap" xs={6} justify="flex-end">
          {data.applicationURL && (
            <Grid item>
              <Button
                onClick={handleViewClick}
                color="primary"
                variant="outlined"
                href={data.applicationURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ outline: 'none' }}
                className={classes.folderLink}
              >
                <Typography>
                  {intl.formatMessage({ id: 'components.applicationDialog.regdocs' })}
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
                <Icon className={classes.icon}>
                  <img
                    src={downloadIcon}
                    alt={intl.formatMessage({ id: 'common.downloadAltText' })}
                  />
                </Icon>
                <Typography>
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                  >
                    {intl.formatMessage({ id: 'components.applicationDialog.tables' })}
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

ApplicationDialog.propTypes = {
  data: PropTypes.shape({
    filingDate: PropTypes.string,
    shortName: PropTypes.string,
    url: PropTypes.string,
    applicationURL: PropTypes.string,
    figureCount: PropTypes.number,
    tableCount: PropTypes.number,
    alignmentSheetCount: PropTypes.number,
    hearingOrder: PropTypes.string,
    companyName: PropTypes.string,
    name: PropTypes.string,
    consultants: PropTypes.string,
    commodity: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

ApplicationDialog.defaultProps = {
  data: null,
};

export default ApplicationDialog;
