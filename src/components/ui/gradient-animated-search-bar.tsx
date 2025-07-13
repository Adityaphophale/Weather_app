import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

interface GradientAnimatedSearchBarProps {
  onSearch?: (query: string) => Promise<void> | void;
  placeholder?: string;
}

export const GradientAnimatedSearchBar: React.FC<GradientAnimatedSearchBarProps> = ({
  onSearch,
  placeholder = "Enter city name",
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    if (onSearch) {
      await Promise.resolve(onSearch(query.trim()));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex items-center justify-center p-2"
    >
      <div className="flex w-full rounded-full bg-gradient-to-r from-blue-200 via-blue-100 to-yellow-100 shadow-lg px-2 py-1 transition-all duration-300 focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-blue-300">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: '#222',
            fontSize: '1.05rem',
          }}
          className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-800 rounded-full text-base transition-all duration-300 focus:bg-white/80"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 text-white w-12 h-12 ml-2 shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? (
            <FaSpinner className="animate-spin w-5 h-5" />
          ) : (
            <FaSearch className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}; 