import { useState, useEffect } from 'react';
import { useUrlParam } from './useUrlParam';

export const useCountdown = (
  initialDate,
  initialTime,
  initialDesc,
  initialTimezone,
  initialCountdownStyle,
  initialBackground
) => {
  const [days, setDays] = useState(null);
  const [date, setDate] = useUrlParam('date', initialDate);
  const [time, setTime] = useUrlParam('time', initialTime);
  const [desc, setDesc] = useUrlParam('desc', initialDesc);
  const [timezone, setTimezone] = useUrlParam('timezone', initialTimezone);
  const [countdownStyle, setCountdownStyle] = useUrlParam('style', initialCountdownStyle);
  const [background, setBackground] = useUrlParam('bg', initialBackground);

  useEffect(() => {
    // Calculate difference in days
    const calculateDifference = (target, offset, current) => Math.max(target.getTime() - offset - current.getTime(), 0) / (1000 * 60 * 60 * 24);

    // Construct target date
    const targetDate = new Date(`${date}T${time}:00`);

    // Calculate offset from UTC
    const offset = new Date().getTimezoneOffset() * 60 * 1000;

    // Adjust for selected timezone
    const targetInSelectedTimezone = new Date(targetDate.getTime() + offset);

    // Fallback for invalid timezone
    let timezoneDate = new Date(Intl.DateTimeFormat().resolvedOptions().timeZone);
    try {
      timezoneDate = new Date(targetInSelectedTimezone.toLocaleString('en-US', { timeZone: timezone }));
    } catch (e) {
      const fallbackTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(fallbackTimezone);
    }

    // Calculate timezone offset
    const timezoneOffset = timezoneDate.getTime() - targetInSelectedTimezone.getTime();

    // Set initial countdown days
    setDays(calculateDifference(targetDate, timezoneOffset, new Date()));

    // Update countdown every 50 ms
    const interval = setInterval(() => {
      setDays(calculateDifference(targetDate, timezoneOffset, new Date()));
    }, 50);

    // Clear interval on unmount or changes
    return () => clearInterval(interval);
  }, [date, timezone, time]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleTimezoneChange = (timezone) => {
    setTimezone(timezone.value);
  };

  const handleCountdownStyle = (selectedOption) => {
    setCountdownStyle(selectedOption.value);
  };

  const handleBackgroundChange = (selectedOption) => {
    setBackground(selectedOption.value);
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
};
