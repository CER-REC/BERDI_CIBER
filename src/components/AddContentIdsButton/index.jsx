import React from 'react';
import { ButtonBase, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';
import useESAData from '../../hooks/useESAData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    color: theme.palette.blue.darkImperial,
    textDecoration: 'underline',
    paddingTop: '1em',
    float: 'right',
  },
}));

const AddContentIdsButton = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { downloadTableIds } = useESAData();
  const { configDispatch } = useConfig();
  const handleAddAllClick = () => {
    configDispatch({ type: 'cartIds/added', payload: downloadTableIds });
  };

  return (
    <ButtonBase className={classes.root} onClick={handleAddAllClick}>
      {intl.formatMessage({ id: 'components.addContentIdsButton.add' }, {
        num: downloadTableIds.length,
        formattedNum: (<span style={{ fontWeight: 700 }}>{intl.formatNumber(downloadTableIds.length)}</span>),
      })}
    </ButtonBase>
  );
};

export default AddContentIdsButton;
