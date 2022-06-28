import { makeStyles, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: '5px',
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    maxHeight: '80%',
    maxWidth: 650,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.teal.blue,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0em 1em',
    '& button': {
      color: 'inherit',
      marginRight: '-0.5em',
    },
  },
  content: { padding: '1.5em' },
}));

const CERDialog = ({ children, title, open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className={classes.header} disableTypography>
        <Typography variant="h6">
          {title}
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

CERDialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CERDialog;
