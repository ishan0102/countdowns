import { useState, useEffect } from 'react';

export function Countdown() {
  const [days, setDays] = useState(null);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const storedDate = localStorage.getItem('date');
    const storedDesc = localStorage.getItem('desc');
    if (storedDate) setDate(storedDate);
    if (storedDesc) setDesc(storedDesc);
  }, []);

  useEffect(() => {
    const now = new Date();
    const centralTimeOffset = new Date().getTimezoneOffset() * 60 * 1000 + 6 * 60 * 60 * 1000;
    let targetDate;
    if (date) {
      targetDate = new Date(date);
    } else {
      const currentYear = now.getFullYear();
      targetDate = new Date(`${currentYear + 1}-01-01T00:00:00Z`);
    }
    const difference = Math.max(targetDate - now, 0);
    const initialDaysLeft = difference / (1000 * 60 * 60 * 24);
    setDays(initialDaysLeft);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = Math.max(targetDate - now, 0);
      const daysLeft = difference / (1000 * 60 * 60 * 24);
      setDays(daysLeft);
    }, 100);

    return () => clearInterval(interval);
  }, [date]);

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    const year = inputDate.getFullYear();
    
    // Check if year is more than 4 digits
    if (year > 9999 || year < 0) {
      return;
    }

    setDate(e.target.value);
    localStorage.setItem('date', e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    localStorage.setItem('desc', e.target.value);
  };

  if (days === null) {
    return null;
  }

  const integerDays = Math.floor(days);
  const fractionalDays = (days % 1).toFixed(6);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: "url('/static/img/bg.png')" }}>
      <div className="w-2/3 md:w-1/6 p-4 absolute top-4 md:top-4 md:right-4 backdrop-filter backdrop-blur-lg">
        <label className="block text-white text-sm font-apple2mono">
          date
          <input type="date" value={date} onChange={handleDateChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-white text-sm font-apple2mono mt-2">
          description
          <input type="text" placeholder={(new Date().getFullYear() + 1)} value={desc} onChange={handleDescChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </label>
      </div>
      <div className="text-center">
        <div className="text-5xl md:text-8xl text-white font-bold font-apple2mono">
          {integerDays}
          <span className="text-2xl md:text-4xl text-neutral-400 font-normal -ml-2 md:-ml-4 text-opacity-75">.{fractionalDays.slice(2)}</span>
        </div>
        <p className="text-sm md:text-2xl text-neutral-400 font-apple2mono mb-8 text-opacity-75">days till {desc || (new Date().getFullYear() + 1)}</p>
      </div>
      <a href="https://buildspace.so/home" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 opacity-75 text-white py-1 px-2 rounded text-xs">design inspo: buildspace</a>
    </div>
  );
}
