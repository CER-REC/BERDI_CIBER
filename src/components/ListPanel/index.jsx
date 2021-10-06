import { Button, makeStyles, Grid } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import useESAData from '../../hooks/useESAData';
import SearchList from './SearchList';
import LimitationsDialog from '../LimitationsDialog';

const useStyles = makeStyles((theme) => ({
  expandButtons: {
    '& button': {
      color: theme.palette.teal.blue,
      borderColor: theme.palette.teal.blue,
      padding: '0.3em 2.2em',
    },
  },
}));

const ListSection = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { contents } = useESAData();
  const [expandList, setExpandList] = useState([]);

  const toggleExpand = (id) => {
    if (expandList.find((entry) => entry === id)) {
      setExpandList((list) => list.filter((item) => item !== id));
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

  const [open, setOpen] = useState(false);
  const handleButtonClick = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <Grid container justify="space-between" style={{ paddingBottom: '0.5em' }}>
        <Grid item className={classes.expandButtons}>
          <Button onClick={expandAll} variant="outlined" style={{ marginRight: '0.5em' }}>{intl.formatMessage({ id: 'components.listPanel.expandAll' })}</Button>
          <Button onClick={collapseAll} variant="outlined">{intl.formatMessage({ id: 'components.listPanel.collapseAll' })}</Button>
        </Grid>

        <Grid item style={{ paddingRight: '0.5em' }}>
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
