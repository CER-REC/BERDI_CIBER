import React from 'react';
import { ButtonBase, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';

const useStyles = makeStyles({
  root: {
    display: 'block',
    color: '#07456B',
    textDecoration: 'underline',
    paddingTop: '1em',
    float: 'right',
  },
});

const AddContentIdsButton = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { contentIds, totalCount } = useESAData();
  const { configDispatch } = useConfig();
  const handleAddAllClick = () => {
    configDispatch({ type: 'cartIds/added', payload: contentIds });
  };

  return (
    <ButtonBase className={classes.root} onClick={handleAddAllClick}>
      {intl.formatMessage({ id: 'components.addContentIdsButton.add' }, {
        num: totalCount,
        formattedNum: (<span style={{ fontWeight: 700 }}>{intl.formatNumber(totalCount)}</span>),
      })}
    </ButtonBase>
  );
};

export default AddContentIdsButton;
