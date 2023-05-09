import { useCountdown } from './useCountdown';

const DECIMAL_PLACES = 6;

export function Countdown() {
  const {
    days,
    date,
    desc,
    timezone,
    timeZones,
    handleDateChange,
    handleDescChange,
    handleTimezoneChange
  } = useCountdown();

  if (days === null) {
    return null;
  }

  const integerDays = Math.floor(days);
  const fractionalDays = (days % 1).toFixed(DECIMAL_PLACES);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: "url('/static/img/bg.png')" }}>
      <div className="w-2/3 md:w-1/6 p-4 absolute top-4 md:top-4 md:right-4 backdrop-filter backdrop-blur-lg">
        <label className="block text-white text-sm font-apple2mono">
          date
          <input type="date" value={date} onChange={handleDateChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-white         text-sm font-apple2mono mt-2">
          description
          <input type="text" value={desc} onChange={handleDescChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-white text-sm font-apple2mono mt-2">
          timezone
          <select value={timezone} onChange={handleTimezoneChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono">
            {Object.keys(timeZones).map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
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
