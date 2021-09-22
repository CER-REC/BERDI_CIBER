import React from 'react';
import { Button, Dialog, Typography, makeStyles, IconButton, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import useConfig from '../../../../hooks/useConfig';

const useStyles = makeStyles(
  {
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
      fontWeight: '400',
    },
    button: {
      color: '#284162',
      border: '1px solid #284162',
      marginRight: '1em',
    },
    description: {
      color: '#616060',
      padding: '1em 1em 1em 0 ',
    },
  },
);
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
            <Typography className={classes.title}>
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
    topic: PropTypes.string.isRequired,
  }).isRequired,
};
