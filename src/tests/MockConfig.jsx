import { useEffect, useState } from 'react';

import useConfig from '../hooks/useConfig';
import { initialState } from '../hooks/reducer';

const MockConfig = ({ state, children }) => {
  const [isMocked, setIsMocked] = useState(!state);
  const { config, configDispatch } = useConfig();
  const hasURLStateLoaded = config !== initialState;

  useEffect(() => {
    // Need to wait for the URL state to load first due to the bottom up ordering of hook operations
    if (!hasURLStateLoaded || !state) {
      return;
    }

    configDispatch({
      type: 'changed',
      payload: state,
    });
    setIsMocked(true);
  }, [hasURLStateLoaded, state, configDispatch, setIsMocked]);

  if (!isMocked) {
    return 'Mocking config...';
  }

  return children;
};

export default MockConfig;
