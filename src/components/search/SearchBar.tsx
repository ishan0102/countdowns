"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useCountdown } from "@/hooks/CountdownContext";
import { searchProviders } from "@/components/search/SearchConfig";
import Draggable from "react-draggable";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { settings } = useCountdown();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const provider = searchProviders[settings.searchProvider || "perplexity"];

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `${provider.url}?q=${encodeURIComponent(query)}`;
    }
  }, [query, provider.url]);

  if (!settings.showSearch) return null;

  return (
    <Draggable bounds="parent">
      <form 
        onSubmit={handleSearch}
        className="p-2 bg-black/20 backdrop-blur-md rounded-lg hover:cursor-move w-[90%] md:w-[600px]"
      >
        <div className="relative flex items-center">
          {provider.icon}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={provider.placeholder}
            ref={inputRef}
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