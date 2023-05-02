import { useState, useEffect } from 'react';

export function Countdown() {
  const [days, setDays] = useState(null);

  useEffect(() => {
    const now = new Date();
    const centralTimeOffset = new Date().getTimezoneOffset() * 60 * 1000 + 6 * 60 * 60 * 1000; // calculate the timezone offset in milliseconds
    const centralTimeNow = new Date(now - centralTimeOffset);
    const currentYear = centralTimeNow.getFullYear();
    const targetDate = new Date(`${currentYear + 1}-01-01T00:00:00Z`); // midnight UTC of the next year
    const difference = Math.max(targetDate - centralTimeNow, 0);
    const initialDaysLeft = difference / (1000 * 60 * 60 * 24);
    setDays(initialDaysLeft);

    const interval = setInterval(() => {
      const now = new Date();
      const centralTimeNow = new Date(now - centralTimeOffset);
      const difference = Math.max(targetDate - centralTimeNow, 0);
      const daysLeft = difference / (1000 * 60 * 60 * 24);
      setDays(daysLeft);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (days === null) {
    return null; // Render nothing until the initial state is set
  }

  const integerDays = Math.floor(days);
  const fractionalDays = (days % 1).toFixed(6);

  return (
    <div className="flex items-center justify-center h-screen bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: "url('/static/img/bg.png')" }}>
      <div className="text-center">
        <div className=" text-5xl md:text-8xl text-white font-bold font-apple2mono">
          {integerDays}
          <span className="text-2xl md:text-4xl text-neutral-400 font-normal -ml-2 md:-ml-4 text-opacity-75">.{fractionalDays.slice(2)}</span>
        </div>
        <p className="text-sm md:text-2xl text-neutral-400 font-apple2mono mb-8 text-opacity-75">days till {new Date().getFullYear() + 1}</p>
      </div>
      <a href="https://buildspace.so/home" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 opacity-75 text-white py-1 px-2 rounded text-xs">Design credit: Buildspace</a>
    </div>
  );
}
