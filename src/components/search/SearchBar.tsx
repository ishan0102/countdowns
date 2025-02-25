"use client";

import { useCallback, useState } from "react";
import { useCountdown } from "@/hooks/CountdownContext";
import Draggable from "react-draggable";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { settings } = useCountdown();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }, [query]);

  if (!settings.showSearch) return null;

  return (
    <Draggable bounds="parent">
      <form 
        onSubmit={handleSearch}
        className="p-2 bg-black/20 backdrop-blur-md rounded-lg hover:cursor-move w-[90%] md:w-[600px]"
      >
        <div className="relative flex items-center">
          <svg 
            className="absolute left-3 w-5 h-5 opacity-50" 
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              fill="currentColor"
              className="text-white"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google..."
            className="bg-transparent border border-white/20 rounded px-12 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 hover:cursor-text w-full pr-12 font-apple2mono text-sm"
          />
          <button 
            type="submit" 
            className="absolute right-3 opacity-50 hover:opacity-75 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </form>
    </Draggable>
  );
} 