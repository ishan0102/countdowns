import {
  BackgroundOption,
  BackgroundOptions
} from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext, useContext,
  useEffect,
  useState
} from "react";

type CountdownContextState = {
  date: Date;
  description: string;
  timezone: string;
  style: string;
  background: BackgroundOption;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
  setBackground: React.Dispatch<React.SetStateAction<BackgroundOption>>;
};

const CountdownContext = createContext<CountdownContextState | undefined>(
  undefined
);

export const CountdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultDate = new Date(
    `${new Date().getFullYear() + 1}-01-01T00:00:00.000Z`
  );
  const defaultDescription = (new Date().getFullYear() + 1).toString();
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultStyle = "fractional";
  const defaultBackground = BackgroundOptions[0];

  const parseDateArguments = (dateStr: string): number[] => {
    const parts = dateStr.split(/[- :]/);
    return parts.map((part) => parseInt(part));
  };

  const parseDate = (value: string | string[] | undefined): Date => {
    if (typeof value === "string") {
      const [year, month, day, hour = 0, minute = 0] =
        parseDateArguments(value);
      return new Date(Date.UTC(year, month - 1, day, hour, minute));
    }
    return defaultDate;
  };

  const parseString = (value: string | string[] | undefined): string => {
    if (typeof value === "string") {
      return value;
    }
    return "";
  };

  const [date, setDate] = useState<Date>(
    searchParams.get("date")
      ? parseDate(`${searchParams.get("date")!} ${searchParams.get("time")}`)
      : defaultDate
  );
  const [description, setDescription] = useState<string>(
    parseString(searchParams.get("desc") || defaultDescription)
  );
  const [timezone, setTimezone] = useState<string>(
    parseString(searchParams.get("timezone") || defaultTimezone)
  );
  const [style, setStyle] = useState<string>(
    parseString(searchParams.get("style") || defaultStyle)
  );
  const [background, setBackground] = useState<BackgroundOption>(
    BackgroundOptions.find(
      (o) =>
        o.value ===
        parseString(searchParams.get("bg") || defaultBackground.value)
    ) || defaultBackground
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("date", date.toISOString().split("T")[0]);
    params.set("time", date.toISOString().split("T")[1].substring(0, 5));
    params.set("desc", description);
    params.set("timezone", timezone);
    params.set("style", style);
    params.set("bg", background.value);
    router.replace(`/?${params.toString()}`, undefined);

    document.title = description;
  }, [date, description, timezone, style, background.value]);

  const contextValue = {
    date,
    description,
    timezone,
    style,
    background,
    setDate,
    setDescription,
    setTimezone,
    setStyle,
    setBackground,
  };

  return (
    <CountdownContext.Provider value={contextValue}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
};
