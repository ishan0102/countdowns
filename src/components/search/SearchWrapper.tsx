"use client";

import { useCountdown } from "@/hooks/CountdownContext";
import SearchBarGoogle from "./SearchBarGoogle";
import SearchBarPPLX from "./SearchBarPPLX";

export default function SearchWrapper() {
  const { settings } = useCountdown();

  if (!settings.showSearch) {
    return null;
  }

  return settings.searchProvider === "google" ? (
    <SearchBarGoogle />
  ) : (
    <SearchBarPPLX />
  );
}
