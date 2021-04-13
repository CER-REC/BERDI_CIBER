import React, { useCallback, useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';

import LimitationsDialog from '../LimitationsDialog';
import SearchList from './SearchList';

const useStyles = makeStyles({
  root: {
    marginTop: '15px',
    height: 'auto',
  },
  innerGrid: {
    height: '100%',
    marginTop: '5px',
  },
});

const ListSection = () => {
  const classes = useStyles();
  const intl = useIntl();

  const [open, setOpen] = useState(false);
  const handleButtonClick = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <Grid container justify="space-between" alignItems="center" className={classes.root}>
        <Grid item xs={12} className={classes.innerGrid} style={{ textAlign: 'right' }}>

          <Button color="primary" variant="contained" disableElevation onClick={handleButtonClick}>
            {intl.formatMessage({ id: 'components.resultsList.dataButton.label' })}
          </Button>
          <LimitationsDialog
            open={open}
            hasDownload
            onClose={handleClose}
          />

        </Grid>
      </Grid>

      <SearchList />
    </>
  );
};

export default ListSection;
