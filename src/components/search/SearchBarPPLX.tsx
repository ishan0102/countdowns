"use client";

import { useCallback, useState } from "react";
import { useCountdown } from "@/hooks/CountdownContext";
import Draggable from "react-draggable";

export default function SearchBarPPLX() {
  const [query, setQuery] = useState("");
  const { settings } = useCountdown();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://perplexity.ai/search?q=${encodeURIComponent(query)}`;
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
            className="absolute left-2 w-8 h-8 opacity-50" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 256 256"
          >
            <g fill="#919090">
              <g transform="scale(5.12,5.12)">
                <path d="M5,5v40h40v-40zM7,7h36v36h-36zM35,8.77344l-9,8v-7.64844h-2v7.77344l-9,-8v9.10156h-4v14h4v9.22656l9,-8v6.77344h2v-6.64844l9,8v-9.35156h4v-14h-4zM33,13.22656v4.77344h-5.36914zM17,13.35156l5.22852,4.64844h-5.22852zM13,20h9.36914l-7.36914,6.55078v3.44922h-2zM27.49023,20h9.50977v10h-2v-3.32422zM24,21.22852v9.32422l-7,6.2207v-9.32422zM26,21.35156l7,6.22266v9.32422l-7,-6.22266z"></path>
              </g>
            </g>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Plex it..."
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