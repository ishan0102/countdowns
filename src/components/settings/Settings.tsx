"use client";

import TimezoneSelect from "react-timezone-select";
import Label from "../select/Label";
import Select from "react-select";
import CustomOption from "../select/CustomOption";
import { BackgroundOptions, CountdownStyles } from "@/types/types";
import { useCountdown } from "@/hooks/CountdownContext";
import { useState } from "react";

export default function Settings() {
  const {
    date,
    description,
    timezone,
    style,
    background,
    setDate,
    setTimezone,
    setDescription,
    setStyle,
    setBackground,
  } = useCountdown();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDateValue = event.target.value;
    if (!event.target.value) return;
    setDate((currentDate: Date) => {
      const newDate = new Date(currentDate);
      const [year, month, day] = newDateValue.split("-").map(Number);
      newDate.setFullYear(year, month - 1, day);
      return newDate ? newDate : currentDate;
    });
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeValue = event.target.value;
    if (!event.target.value) return;
    setDate((currentDate: Date) => {
      const newTime = new Date(currentDate);
      const [hours, minutes] = newTimeValue.split(":").map(Number);
      newTime.setHours(hours, minutes);
      return newTime ? newTime : currentDate;
    });
  };

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <button
        className="absolute top-4 left-4 text-neutral-400 transition-all hover:text-neutral-200 hover:cursor-pointer z-10"
        onClick={() => setVisible(!visible)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
      </button>

      {visible && (
        <div
          className={`absolute flex flex-col gap-1 w-[calc(100%-2rem)] max-w-md md:w-1/2 lg:w-1/4 top-16 left-4 md:right-4 backdrop-filter backdrop-blur-lg border border-neutral-800 p-4 mt-2 rounded-lg z-10`}
        >
          <Label text="date">
            <input
              type="date"
              defaultValue={date.toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="w-full p-2 rounded text-black text-xs font-apple2mono"
            />
          </Label>
          <Label text="time">
            <input
              type="time"
              defaultValue={date.toISOString().split("T")[1].substring(0, 5)}
              onChange={handleTimeChange}
              className="w-full p-2 rounded text-black text-xs font-apple2mono"
            />
          </Label>
          <Label text="description">
            <input
              type="text"
              placeholder={(new Date().getFullYear() + 1).toString()}
              defaultValue={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full p-2 rounded text-black text-xs font-apple2mono"
            />
          </Label>
          <Label text="timezone">
            <TimezoneSelect
              className="text-black text-xs w-full"
              value={timezone}
              onChange={(timezone) => setTimezone(timezone.value)}
              isSearchable={true}
            />
          </Label>
          <Label text="style">
            <Select
              defaultValue={{
                value: style,
                label: style,
              }}
              onChange={(option) => option && setStyle(option.value)}
              className="w-full rounded text-black text-xs font-apple2mono"
              options={CountdownStyles.map((style) => {
                return {
                  value: style,
                  label: style,
                };
              })}
              isSearchable={false}
            />
          </Label>
          <Label text="background">
            <Select
              defaultValue={{
                value: background.value,
                label: background.label,
                src: background.src,
              }}
              onChange={(background) => background && setBackground(background)}
              className="w-full rounded text-black text-xs font-apple2mono"
              options={BackgroundOptions}
              isSearchable={false}
              components={{ Option: CustomOption }}
            />
          </Label>
          <div className="block text-neutral-300 text-xs font-apple2mono mt-4">
            <span>hints:</span>
            <ul className="list-disc pl-5">
              <li>you can move the countdown</li>
              <li>you can set this as your new tab page</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
