import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';
import { reportSection } from '../../../utilities/analytics';

const DataNotice = () => {
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = () => {
    reportSection('methods');
    configDispatch({ type: 'page/changed', payload: 'methods' });
  };

  return (
    <Grid className="DataNotice" item>
      <Typography>
        {intl.formatMessage({ id: 'components.resultDialog.dataNotice' })}
        &nbsp;
        <Button
          color="inherit"
          onClick={handleClick}
          disableRipple
        >
          {intl.formatMessage({ id: 'common.learnMethods' })}
        </Button>
      </Typography>
    </Grid>
  );
};

export default DataNotice;
