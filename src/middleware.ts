import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getNextOccurrence(month: number, day: number): string {
  let currentYear = new Date().getFullYear();
  let targetDate = new Date(currentYear, month - 1, day + 1);

  if (targetDate.getTime() < new Date().getTime()) {
    targetDate.setFullYear(currentYear + 1);
  }

  return targetDate.toISOString().split("T")[0];
}

const routeKeys: Record<string, string> = {
  nye: "newYearsEve",
  newyears: "newYearsEve",
  newyear: "newYears",
  halloween: "halloween",
  christmas: "christmas",
  xmas: "christmas",
  valentines: "valentines",
};

interface RouteConfig {
  date: string;
  time: string;
  desc: string;
  style: string;
  bg: string;
}

const routeConfigs: Record<string, RouteConfig> = {
  newYearsEve: {
    date: getNextOccurrence(12, 31),
    time: "00:00",
    desc: "new year's eve",
    style: "fractional",
    bg: "beach.gif",
  },
  newYears: {
    date: getNextOccurrence(1, 1),
    time: "00:00",
    desc: (new Date().getFullYear() + 1).toString(),
    style: "fractional",
    bg: "forest.gif",
  },
  halloween: {
    date: getNextOccurrence(10, 31),
    time: "00:00",
    desc: "halloween",
    style: "fractional",
    bg: "bedroom.gif",
  },
  christmas: {
    date: getNextOccurrence(12, 25),
    time: "00:00",
    desc: "christmas day",
    style: "fractional",
    bg: "castle.gif",
  },
  valentines: {
    date: getNextOccurrence(2, 14),
    time: "00:00",
    desc: "valentine's day",
    style: "fractional",
    bg: "star.png",
  },
};

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/").pop();

  if (slug) {
    const routeKey = routeKeys[slug];
    const routeConfig = routeConfigs[routeKey];
    if (routeConfig) {
      const queryString = Object.entries(routeConfig)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      return NextResponse.redirect(`${request.nextUrl.origin}/?${queryString}`);
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
