import React, { useCallback } from 'react';
import { Button, Dialog, Grid, Icon, IconButton, Typography, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import downloadIcon from '../../images/Download.svg';
import { reportDownload, reportView } from '../../utilities/analytics';
import styles from './styles';

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
    label: 'common.applicationType',
    content: intl.formatMessage({ id: `api.projects.${data.type}` }),
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
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <Typography
              component="span"
              className={classes.statusIndicator}
            >
              {intl.formatMessage({ id: `api.statuses.${data.status}` }) }
            </Typography>
          </Grid>
        </Grid>

      </Grid>

      {/* Footer */}
      <Grid container wrap="nowrap" justify="space-around" className={classes.footer}>
        {/* Table / Figure Counts */}
        <Grid item container spacing={1} xs={4} alignItems="center" className={classes.counts}>
          <Grid item>
            <Typography>
              <span>{`${intl.formatNumber(data.tableCount)} `}</span>
              {intl.formatMessage({ id: 'common.tableCount' }, { tables: data.tableCount })}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.figures}>
              {`${intl.formatNumber(data.figureCount)} `}
              {intl.formatMessage({ id: 'common.figureCount' }, { figures: data.figureCount })}
            </Typography>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid item spacing={1} container wrap="nowrap" xs={8} justify="flex-end">
          {data.regdocsURL && (
            <Grid item>
              <Button
                onClick={handleViewClick}
                color="primary"
                variant="outlined"
              >
                <Typography>
                  <a
                    className={classes.folderLink}
                    href={data.regdocsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage({ id: 'components.applicationDialog.regdocs' })}
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
                <Icon className={classes.icon}>
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
  onClose: PropTypes.func.isRequired,
};

ApplicationDialog.defaultProps = {
  data: null,
};

export default ApplicationDialog;
