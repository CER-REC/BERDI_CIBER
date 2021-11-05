import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useESAData from '../../hooks/useESAData';
import { reportExpand, reportCollapse } from '../../utilities/analytics';
import SearchList from './SearchList';

const useStyles = makeStyles((theme) => ({
  expandButtons: {
    '& button': {
      color: theme.palette.teal.blue,
      borderColor: theme.palette.teal.blue,
      padding: '0.2em 2.5em',
      fontWeight: '400',
      fontSize: '16px',
    },
  },
}));

const ListSection = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { ids } = useESAData();
  const [expandList, setExpandList] = useState([]);

  const toggleExpand = (id) => {
    if (expandList.find((entry) => entry === id)) {
      setExpandList((list) => list.filter((item) => item !== id));
    } else {
      setExpandList((list) => [...list, id]);
    }
  };

  const expandAll = () => {
    setExpandList(ids);
    reportExpand();
  };
  const collapseAll = () => {
    setExpandList([]);
    reportCollapse();
  };

  return (
    <>
      <Grid container justify="space-between" style={{ paddingBottom: '0.5em' }}>
        <Grid item className={classes.expandButtons}>
          <Button onClick={expandAll} variant="outlined" style={{ marginRight: '0.5em' }}>{intl.formatMessage({ id: 'components.listPanel.expandAll' })}</Button>
          <Button onClick={collapseAll} variant="outlined">{intl.formatMessage({ id: 'components.listPanel.collapseAll' })}</Button>
        </Grid>

      </Grid>

      <SearchList expandList={expandList} toggleExpand={toggleExpand} />
    </>
  );
};

export default ListSection;
