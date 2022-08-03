import { Button, Dialog, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import DotsRating from '../../DotsRating';

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
    paddingTop: '1em',
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
  relationMessage: {
    paddingLeft: '0.5em',
    color: theme.palette.grey.dark,
  },
}));

const RelatedTopicsDialog = ({ open, onClose, data }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { configDispatch } = useConfig();

  const relationMessages = [
    intl.formatMessage({ id: 'components.svgButton.noRelation' }),
    intl.formatMessage({ id: 'components.svgButton.littleRelation' }),
    intl.formatMessage({ id: 'components.svgButton.someRelation' }),
    intl.formatMessage({ id: 'components.svgButton.strongRelation' }),
  ];

  const handleClick = () => {
    configDispatch({ type: 'topics/added', payload: data.topic });
    onClose();
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ style: { maxWidth: '35em', padding: '0 0 1em 1.5em' } }}
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
            <IconButton aria-label={intl.formatMessage({ id: 'common.closeAltText' })} onClick={onClose} style={{ paddingTop: '0.5em' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Body */}
        <Grid item container alignItems="center">
          <DotsRating score={data.score} type={data.type} />
          <Typography className={classes.relationMessage}>
            {relationMessages[data.score]}
          </Typography>
        </Grid>
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
    score: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
};
