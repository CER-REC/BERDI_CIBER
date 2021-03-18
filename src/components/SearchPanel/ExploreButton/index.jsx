import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';

const ExploreButton = () => {
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleClick = useCallback(() => {
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'searches/changed', payload: null });
  }, [configDispatch]);

  return (
    <Button
      className="ExploreButton"
      variant="contained"
      onClick={handleClick}
      disableElevation
    >
      {intl.formatMessage({ id: 'components.searchPanel.exploreButton' })}
    </Button>
  );
};

export default ExploreButton;
