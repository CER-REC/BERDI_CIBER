import React from 'react';
import { Button, Dialog, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const RelatedTopicsDialog = ({ open, onClose, data }) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{ style: { maxWidth: '480px' } }}
  >
    <Typography>
      {data.title}
    </Typography>
    <Typography>
      {data.description}
    </Typography>
    <Button onClick={onClose}>
      Click to see more
    </Button>
  </Dialog>
);
export default RelatedTopicsDialog;

RelatedTopicsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({ title: PropTypes.string, description: PropTypes.string }).isRequired,
};
