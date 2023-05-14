import { useState, useEffect } from 'react';

export const useUrlParam = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const valueFromUrl = urlParams.get(key);
      if (valueFromUrl) {
        return valueFromUrl;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  }, [key, value]);

  return [value, setValue];
};