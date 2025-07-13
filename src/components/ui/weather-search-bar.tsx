import React, { useState, useRef } from "react";
import { Search } from "lucide-react";

interface WeatherSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const WeatherSearchBar: React.FC<WeatherSearchBarProps> = ({ placeholder = "Search for a city...", onSearch }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex items-center justify-center"
    >
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-blue-400" />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 text-gray-800 placeholder-gray-400 shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:bg-white hover:shadow-lg"
        />
      </div>
    </form>
  );
}; 