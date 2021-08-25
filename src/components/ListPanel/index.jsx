import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useESAData from '../../hooks/useESAData';
import SearchList from './SearchList';

const useStyles = makeStyles({
  expandButtons: {
    '& button': {
      color: '#222',
      textShadow: '0 1px 1px white',
      borderColor: '#C8C8C8 #C8C8C8 #BBB',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '0.2em 0.5em',
      backgroundImage: 'linear-gradient(#EEE,#D4D4D4)',
    },
  },
});

const ListSection = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { contents } = useESAData();
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
      <div className={classes.expandButtons}>
        <Button onClick={expandAll} variant="contained" style={{ marginRight: '0.5em' }}>{intl.formatMessage({ id: 'components.listPanel.expandAll' })}</Button>
        <Button onClick={collapseAll} variant="contained">{intl.formatMessage({ id: 'components.listPanel.collapseAll' })}</Button>
      </div>

      <SearchList expandList={expandList} toggleExpand={toggleExpand} />
    </>
  );
};

export default ListSection;
