import { useEffect } from 'react';

export const useUrlParam = (key, value) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  }, [key, value]);
};
