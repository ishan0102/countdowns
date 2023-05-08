import { useState, useEffect } from 'react';

const timeZones = {
  'Eastern': 'America/New_York',
  'Central': 'America/Chicago',
  'Mountain': 'America/Denver',
  'Pacific': 'America/Los_Angeles',
};

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

export function useCountdown() {
  // Retrieve initial values from localStorage
  const initialDate = getInitialValue('date', new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const initialDesc = getInitialValue('desc', 'tomorrow');
  const initialTimezone = getInitialValue('timezone', 'Eastern');

  const [days, setDays] = useState(null);
  const [date, setDate] = useState(initialDate);
  const [desc, setDesc] = useState(initialDesc);
  const [timezone, setTimezone] = useState(initialTimezone);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date(date + 'T00:00:00');

    // Offset between UTC and local time
    const offset = now.getTimezoneOffset() * 60 * 1000;

    // Calculate target date in selected timezone
    const targetInSelectedTimezone = new Date(targetDate.getTime() + offset);
    const timezoneDate = new Date(targetInSelectedTimezone.toLocaleString('en-US', { timeZone: timeZones[timezone] }));
    const timezoneOffset = timezoneDate.getTime() - targetInSelectedTimezone.getTime();

    const difference = Math.max(targetDate.getTime() - timezoneOffset - now.getTime(), 0);
    const initialDaysLeft = difference / (1000 * 60 * 60 * 24);
    setDays(initialDaysLeft);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = Math.max(targetDate.getTime() - timezoneOffset - now.getTime(), 0);
      const daysLeft = difference / (1000 * 60 * 60 * 24);
      setDays(daysLeft);
    }, 100);

    return () => clearInterval(interval);
  }, [date, timezone]);

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    const year = inputDate.getFullYear();
  
    // Check if year is more than 4 digits
    if (year > 9999 || year < 0) {
      return;
    }
  
    // Set the date and store it in local storage
    setDate(e.target.value);
    localStorage.setItem('date', e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    localStorage.setItem('desc', e.target.value);
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
    localStorage.setItem('timezone', e.target.value);
  };

  return {
    days,
    date,
    desc,
    timezone,
    timeZones,
    handleDateChange,
    handleDescChange,
    handleTimezoneChange
  };
}
