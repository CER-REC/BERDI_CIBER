import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';

import useConfig from '../../../hooks/useConfig';

const ExploreButton = () => {
  const intl = useIntl();
  const { configDispatch } = useConfig();
  const handleExploreClick = useCallback(() => {
    configDispatch({ type: 'filters/removed' });
    configDispatch({ type: 'searches/changed', payload: null });
  }, [configDispatch]);

  return (
    <Button
      variant="contained"
      onClick={handleExploreClick}
      disableElevation
    >
      {intl.formatMessage({ id: 'components.searchPanel.exploreButton' })}
    </Button>
  );
};

export default ExploreButton;
