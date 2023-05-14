import { useState, useEffect } from 'react';
import { useCountdown } from './useCountdown';
import TimezoneSelect from 'react-timezone-select';
import Select, { components } from 'react-select';
import Draggable from 'react-draggable';

// Define repetitive data as constants
const COUNTDOWN_STYLES = [
  { value: 'fractional', label: 'fractional' },
  { value: 'traditional', label: 'traditional' },
];

const BACKGROUNDS = [
  { value: 'forest.gif', label: 'forest.gif' },
  { value: 'dystopian.gif', label: 'dystopian.gif' },
  { value: 'bedroom.gif', label: 'bedroom.gif' },
  { value: 'castle.gif', label: 'castle.gif' },
  { value: 'lofigirl.gif', label: 'lofigirl.gif' },
  { value: 'overlook.png', label: 'overlook.png' },
  { value: 'palace.png', label: 'palace.png' },
  { value: 'star.png', label: 'star.png' },
  { value: 'cityscape.png', label: 'cityscape.png' },
  { value: 'black.png', label: 'black.png' },
];

// Define a reusable Label component
const Label = ({ text, children }) => (
  <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
    {text}
    {children}
  </label>
);

// Define a custom option component to render images in the dropdown
const CustomOption = ({ data, ...props }) => (
  <components.Option {...props}>
    <div className="flex items-center space-x-2 group">
      <img
        src={`/static/img/${data.value}`}
        alt={data.label}
        className="w-12 md:w-40 h-auto mr-2"
      />
      <span>{data.label}</span>
    </div>
  </components.Option>
);


const DECIMAL_PLACES = 6;

export function Countdown({
  date: initialDate,
  time: initialTime,
  desc: initialDesc,
  timezone: initialTimezone,
  countdownStyle: initialCountdownStyle,
  background: initialBackground,
}) {
  const {
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
  } = useCountdown(initialDate, initialTime, initialDesc, initialTimezone, initialCountdownStyle, initialBackground);

  // Settings and share button
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('share');
  const [copyCount, setCopyCount] = useState(0);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    document.title = desc || 'countdowns';
  }, [desc, days]);

  if (days === null) {
    return null;
  }

  const handleCopy = async () => {
    if (isCopying) {
      return;
    }

    setIsCopying(true);

    try {
      // Copy the current URL to the clipboard
      await navigator.clipboard.writeText(window.location.href);

      // Increase the copy count
      setCopyCount(copyCount + 1);

      if (copyCount === 0) {
        setCopyButtonText('copied!');
      } else if (copyCount === 1) {
        setCopyButtonText('copied!');
      } else if (copyCount === 2) {
        setCopyButtonText('copied!');
      } else if (copyCount === 3) {
        setCopyButtonText('follow me');
      } else if (copyCount === 4) {
        setCopyButtonText('on twitter');
      } else if (copyCount === 5) {
        setCopyButtonText('@ishan0102');
        setCopyCount(0);
      }

      // Reset the button text after 0.75 seconds
      setTimeout(() => {
        setCopyButtonText('share');
        setIsCopying(false);
      }, 750);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  // Countdown
  const integerDays = Math.floor(days);
  const fractionalDays = (days % 1).toFixed(DECIMAL_PLACES);

  const traditionalCountdown = () => {
    const hours = Math.floor((days % 1) * 24);
    const minutes = Math.floor((((days % 1) * 24) % 1) * 60);
    const seconds = Math.round(((((days % 1) * 24) % 1) * 60) % 1 * 60);

    const twoDigitMinutes = String(minutes).padStart(2, '0');
    const twoDigitSeconds = String(seconds).padStart(2, '0');

    return (
      <>
        <span className="text-4xl md:text-6xl">{integerDays}d </span>
        <span className="text-2xl md:text-4xl -ml-3 md:-ml-4 text-neutral-200 text-opacity-75">{hours}h </span>
        <span className="text-2xl md:text-4xl -ml-3 md:-ml-0 text-neutral-200 text-opacity-75">
          {twoDigitMinutes}m{' '}
        </span>
        <span className="text-2xl md:text-4xl -ml-3 md:-ml-0 text-neutral-200 text-opacity-75">
          {twoDigitSeconds}s
        </span>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: `url('/static/img/${background}')` }}>
      {/* Settings button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="block text-white text-xl font-apple2mono focus:outline-none relative transform transition-transform md:duration-200 md:hover:scale-105"
        >
          <span className="inline-block py-2 px-4 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 shadow-md transition-all duration-300 ease-in-out hover:from-indigo-500 hover:to-violet-700">
            customize
          </span>
        </button>
      </div>

      {/* Share button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleCopy}
          className="block text-white text-xl font-apple2mono focus:outline-none relative transform transition-transform md:duration-200 md:hover:scale-105"
        >
          <span className="inline-block py-2 px-4 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 shadow-md transition-all duration-300 ease-in-out hover:from-indigo-500 hover:to-violet-700">
            {copyButtonText}
          </span>
        </button>
      </div>

      {/* Settings */}
      <div className={`absolute w-2/3 md:w-1/4 top-16 left-4 md:right-4 backdrop-filter backdrop-blur-lg p-4 mt-2 rounded-lg z-10 ${isSettingsOpen ? '' : 'hidden'}`}>
        <Label text="date">
          <input type="date" value={date} onChange={handleDateChange} className="mt-1 ml-4 md:ml-0 w-full p-2 rounded text-black font-apple2mono" />
        </Label>
        <Label text="time">
          <input type="time" value={time} onChange={handleTimeChange} className="mt-1 ml-4 md:ml-0 w-full p-2 rounded text-black font-apple2mono" />
        </Label>
        <Label text="description">
          <input type="text" placeholder={new Date().getFullYear() + 1} value={desc} onChange={handleDescChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </Label>
        <Label text="timezone">
          <TimezoneSelect className="text-black" value={timezone} onChange={handleTimezoneChange} isSearchable={true} />
        </Label>
        <Label text="style">
          <Select
            defaultValue={{ value: countdownStyle, label: countdownStyle }}
            onChange={handleCountdownStyle}
            className="mt-1 w-full rounded text-black font-apple2mono"
            options={COUNTDOWN_STYLES}
            isSearchable={false}
          />
        </Label>
        <Label text="background">
          <Select
            defaultValue={{ value: background, label: background }}
            onChange={handleBackgroundChange}
            className="mt-1 w-full rounded text-black font-apple2mono"
            options={BACKGROUNDS}
            isSearchable={false}
            components={{ Option: CustomOption }}
          />
        </Label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-4">
          hints: you can move the countdown. you can also set this as your new tab page.
        </label>
      </div>

      <Draggable bounds="parent">
        <div className="text-center p-2 md:p-8 mb-24 hover:border-4 hover:rounded-lg hover:cursor-move">
          <div className="text-5xl md:text-8xl text-white font-bold font-apple2mono">
            {countdownStyle === 'fractional' ? integerDays : ''}
            {countdownStyle === 'fractional' ? (
              <span className="text-2xl md:text-4xl text-neutral-200 text-opacity-75 font-normal -ml-2 md:-ml-4">.{fractionalDays.slice(2)}</span>
            ) : (
              traditionalCountdown()
            )}
          </div>
          <p className="text-md md:text-2xl text-neutral-400 text-opacity-75 font-apple2mono">
            {countdownStyle === 'fractional' ? 'days' : ''} till {desc || (new Date().getFullYear() + 1)}
          </p>
        </div>
      </Draggable>

      {/* <a href="https://www.ishanshah.me" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 opacity-75 text-white py-1 px-2 rounded text-xs">built by ishan</a> */}
      {/* Buy me a coffee button */}
      <div className="absolute bottom-4 left-4">
        <a href="https://bmc.link/ishanshah" target="_blank" rel="noopener noreferrer">
          <button className="block text-white text-sm font-apple2mono focus:outline-none relative transform transition-transform md:duration-200 md:hover:scale-105">
            <span className="inline-block py-1 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 shadow-md transition-all duration-300 ease-in-out hover:from-orange-500 hover:to-red-800">
              buy me
              <br />
              a coffee
            </span>
          </button>
        </a>
      </div>


      {/* Inspired by buildspace */}
      <a href="https://buildspace.so/home" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 opacity-75 text-white py-1 px-2 rounded text-xs">inspired by buildspace</a>
    </div>
  );
}
