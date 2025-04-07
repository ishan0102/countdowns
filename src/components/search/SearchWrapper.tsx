"use client";

import { useCountdown } from "@/hooks/CountdownContext";
import SearchBar from "@/components/search/SearchBar";

export default function SearchWrapper() {
  const { settings } = useCountdown();

  if (!settings.showSearch) {
    return null;
  }

  return <SearchBar />;
}
