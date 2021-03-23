/* eslint-disable react/prop-types */
import { ButtonBase, Grid, Icon, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import downloadIcon from '../../images/Download.svg';
import styles from './dialogStyles';

const useStyles = makeStyles(styles);

const ListDialog = ({ open, handleClose, data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [canSeeMore, setCanSeeMore] = useState(false);

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
          {intl.formatMessage({ id: 'components.resultsList.seeMore' })}
        </ButtonBase>
      </>
    );
  };

  if (!data) {
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
      <Grid
        container
        item
        direction="column"
        className={classes.topRight}
      >
        <Grid item>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>

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
            {intl.formatMessage({ id: 'components.resultsList.esaSectionTitle' })}
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
                ? intl.formatMessage({ id: 'components.resultsList.figureOccursOnPage' })
                : intl.formatMessage({ id: 'components.resultsList.tableOccursOnPage' })}
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
              onClick={handleClose}
              color="primary"
              variant="outlined"
            >
              <Typography>
                <a
                  href={data.pdfURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#284162' }}
                >
                  {intl.formatMessage({ id: 'components.resultsList.viewOriginalDocument' })}
                </a>
              </Typography>
            </Button>
          </Grid>
          )}

          {data.url && (
          <Grid item>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              style={{ backgroundColor: '#284162' }}
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
                    ? intl.formatMessage({ id: 'components.resultsList.downloadFigure' })
                    : intl.formatMessage({ id: 'components.resultsList.downloadTable' })}
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

export default ListDialog;

ListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    esaSections: PropTypes.string,
    url: PropTypes.string,
    pdfURL: PropTypes.string,
    type: PropTypes.string,
    pageNumber: PropTypes.number,
  }),
};

ListDialog.defaultProps = {
  data: null,
};
