import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.teal.blue,
    float: 'right',
    marginTop: '1em',
  },
}));

const AddContentIdsButton = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { ids } = useESAData();
  const { configDispatch } = useConfig();
  const handleAddAllClick = () => {
    configDispatch({ type: 'cartIds/added', payload: ids });
  };

  if (!ids.length) {
    return null;
  }

  return (
    <Button
      className={classes.root}
      color="inherit"
      onClick={handleAddAllClick}
      disableRipple
    >
      {intl.formatMessage({ id: 'components.addContentIdsButton.add' }, {
        num: ids.length,
        formattedNum: (
          <span style={{ fontWeight: 700 }}>
            {intl.formatNumber(ids.length)}
          </span>
        ),
      })}
    </Button>
  );
};

export default AddContentIdsButton;
