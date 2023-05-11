import { useState, useEffect } from 'react';

// Function to get the initial values from localStorage or set the default values
const getInitialValue = (key, defaultValue) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    } else {
      localStorage.setItem(key, defaultValue);
      return defaultValue;
    }
  }
  return defaultValue;
};

export function useCountdown(
  initialDate,
  initialTime,
  initialDesc,
  initialTimezone,
  initialCountdownStyle,
  initialBackground
) {
  // If any initial value is not provided, retrieve it from localStorage
  initialDate = initialDate || getInitialValue('date', (new Date(new Date().getFullYear() + 1, 0, 1)).toISOString().split('T')[0]);
  initialTime = initialTime || getInitialValue('time', '00:00');
  initialDesc = initialDesc || getInitialValue('desc', new Date().getFullYear() + 1);
  initialTimezone = initialTimezone || getInitialValue('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
  initialCountdownStyle = initialCountdownStyle || getInitialValue('countdownStyle', 'fractional');
  initialBackground = initialBackground || getInitialValue('background', 'forest.gif');

  const [days, setDays] = useState(null);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [desc, setDesc] = useState(initialDesc);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [countdownStyle, setCountdownStyle] = useState(initialCountdownStyle);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date(date + 'T' + time + ':00');

    // Offset between UTC and local time
    const offset = now.getTimezoneOffset() * 60 * 1000;

    // Calculate target date in selected timezone
    const targetInSelectedTimezone = new Date(targetDate.getTime() + offset);
    var timezoneDate = new Date(Intl.DateTimeFormat().resolvedOptions().timeZone);
    try {
      timezoneDate = new Date(targetInSelectedTimezone.toLocaleString('en-US', { timeZone: timezone }));
    } catch (e) {
      console.log('%cError: using an invalid timezone', 'color: red');
      localStorage.setItem('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
    const timezoneOffset = timezoneDate.getTime() - targetInSelectedTimezone.getTime();

    const difference = Math.max(targetDate.getTime() - timezoneOffset - now.getTime(), 0);
    const initialDaysLeft = difference / (1000 * 60 * 60 * 24);
    setDays(initialDaysLeft);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = Math.max(targetDate.getTime() - timezoneOffset - now.getTime(), 0);
      const daysLeft = difference / (1000 * 60 * 60 * 24);
      setDays(daysLeft);
    }, 50);

    return () => clearInterval(interval);
  }, [date, timezone, time]);

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    const year = inputDate.getFullYear();

    // Check if year is more than 4 digits
    if (year > 9999 || year <= 0) {
      return;
    }

    // Set the date and store it in local storage
    setDate(e.target.value);
    localStorage.setItem('date', e.target.value);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('date', e.target.value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    localStorage.setItem('time', e.target.value);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('time', e.target.value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    localStorage.setItem('desc', e.target.value);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('desc', e.target.value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  };

  const handleTimezoneChange = (timezone) => {
    setTimezone(timezone.value);
    localStorage.setItem('timezone', timezone.value);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('timezone', timezone.value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  };

  const handleCountdownStyle = (selectedOption) => {
    setCountdownStyle(selectedOption.value);
    localStorage.setItem('countdownStyle', selectedOption.value);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('style', selectedOption.value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  };

  const handleBackgroundChange = (selectedOption) => {
    setBackground(selectedOption.value);
    localStorage.setItem('background', selectedOption.value);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('bg', selectedOption.value);
    window.history.pushState({}, '', '?' + urlParams.toString());
  };

  return {
    days,
    date,
    time,
    desc,
    timezone,
    countdownStyle,
    background,
    handleDateChange,
    handleTimeChange,
    handleDescChange,
    handleTimezoneChange,
    handleCountdownStyle,
    handleBackgroundChange,
  };
}