import React, { useCallback, useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import useESAData from '../../hooks/useESAData';

import LimitationsDialog from '../LimitationsDialog';
import SearchList from './SearchList';

const useStyles = makeStyles({
  expandButtons: {
    '& button': {
      border: '1px solid #CFCFCF',
      padding: '0.2em 0.5em',
      backgroundImage: 'linear-gradient(#E8E8E8, #DEDEE1)',
    },
  },
});

const ListSection = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { contents } = useESAData();
  const [open, setOpen] = useState(false);
  const handleButtonClick = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const [expandList, setExpandList] = useState([]);

  const toggleExpand = (id) => {
    if (expandList.find((entry) => entry === id)) {
      setExpandList((list) => [...list.filter((item) => item !== id)]);
    } else {
      setExpandList((list) => [...list, id]);
    }
  };

  const expandAll = () => {
    const allIds = contents.map((content) => content.id);
    setExpandList(allIds);
  };
  const collapseAll = () => {
    setExpandList([]);
  };

  return (
    <>
      <Grid container justify="space-between" alignItems="flex-end" className={classes.root}>

        <Grid item className={classes.expandButtons}>
          <Button onClick={expandAll} variant="contained" style={{ marginRight: '0.5em' }}>{intl.formatMessage({ id: 'components.listPanel.expandAll' })}</Button>
          <Button onClick={collapseAll} variant="contained">{intl.formatMessage({ id: 'components.listPanel.collapseAll' })}</Button>
        </Grid>

        <Grid item className={classes.innerGrid}>

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

      <SearchList expandList={expandList} toggleExpand={toggleExpand} />
    </>
  );
};

export default ListSection;
