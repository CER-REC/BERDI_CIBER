import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const expiryKey = 'esa.expiryDate';
const threeDaysInMS = 259200000;
const remainderMS = localStorage.getItem(expiryKey) - new Date().getTime();
const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [hasConfirmation, setHasConfirmation] = useState(remainderMS > 0);

  useEffect(() => {
    if (hasConfirmation) {
      localStorage.setItem(expiryKey, new Date().getTime() + threeDaysInMS);
    } else {
      localStorage.removeItem(expiryKey);
    }
  }, [hasConfirmation]);

  return (
    <ConfirmationContext.Provider value={{ hasConfirmation, setHasConfirmation }}>
      {children}
    </ConfirmationContext.Provider>
  );
};

ConfirmationProvider.propTypes = { children: PropTypes.node };

ConfirmationProvider.defaultProps = { children: null };

export default () => useContext(ConfirmationContext);
