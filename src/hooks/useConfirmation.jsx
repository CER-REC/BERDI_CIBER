import { useEffect, useState } from 'react';

const expiryKey = 'esa.expiryDate';
const threeDaysInMS = 259200000;
const remainderMS = localStorage.getItem(expiryKey) - new Date().getTime();

export default () => {
  const [hasConfirmation, setHasConfirmation] = useState(remainderMS > 0);

  useEffect(() => {
    if (hasConfirmation) {
      localStorage.setItem(expiryKey, new Date().getTime() + threeDaysInMS);
    } else {
      localStorage.removeItem(expiryKey);
    }
  }, [hasConfirmation]);

  return {
    hasConfirmation,
    setHasConfirmation,
  };
};
