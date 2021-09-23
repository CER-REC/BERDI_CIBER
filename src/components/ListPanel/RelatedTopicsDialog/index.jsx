import { Button, Dialog, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';

const useStyles = makeStyles((theme) => ({
  dialogHeader: {
    '& div': {
      textAlign: 'right',
      marginBottom: '-5px',
    },
    '& button': {
      padding: '10px',
    },
    '& svg': {
      fill: 'black',
    },
  },
  title: {
    paddingTop: '0.5em',
    paddingLeft: '0.2em',
    fontWeight: '400',
  },
  button: {
    color: theme.palette.blue.dark,
    border: `1px solid ${theme.palette.blue.dark}`,
    marginRight: '1em',
  },
  description: {
    color: theme.palette.grey.dark,
    padding: '1em 1em 1em 0 ',
  },
}));

const RelatedTopicsDialog = ({ open, onClose, data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();

  const handleClick = () => {
    configDispatch({ type: 'topics/added', payload: data.topic });
    onClose();
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ style: { maxWidth: '35em', padding: '0.5em 0 1em 1em' } }}
      >
        {/* Header */}
        <Grid
          container
          justify="space-between"
          className={classes.dialogHeader}
        >
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              {data.title}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Body */}
        <Typography className={classes.description}>
          {data.description}
        </Typography>
        <Button className={classes.button} onClick={handleClick}>
          {intl.formatMessage({ id: 'components.listPanel.relatedTopics.button' })}
        </Button>
      </Dialog>
    </div>
  );
};
export default RelatedTopicsDialog;

RelatedTopicsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    topic: PropTypes.string,
  }).isRequired,
};
