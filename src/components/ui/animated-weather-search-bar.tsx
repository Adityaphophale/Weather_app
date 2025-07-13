import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedWeatherSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const AnimatedWeatherSearchBar: React.FC<AnimatedWeatherSearchBarProps> = ({ placeholder = "Search for a city...", onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[120px] w-full">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <motion.div
          className="relative w-full"
          animate={{
            scale: isFocused ? 1.04 : 1,
            boxShadow: isFocused
              ? "0 0 0 4px rgba(59,130,246,0.15), 0 8px 32px 0 rgba(0,0,0,0.10)"
              : "0 2px 12px 0 rgba(0,0,0,0.08)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-blue-400" />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/80 text-gray-800 placeholder-gray-400 shadow-lg backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/90 hover:shadow-xl"
            style={{
              boxShadow: isFocused
                ? "0 0 0 4px rgba(59,130,246,0.15), 0 8px 32px 0 rgba(0,0,0,0.10)"
                : "0 2px 12px 0 rgba(0,0,0,0.08)",
              transition: "box-shadow 0.3s, background 0.3s, transform 0.3s",
            }}
          />
          {/* Soft glow effect */}
          <motion.div
            className="absolute -inset-2 rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 0.18 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 80%)",
              filter: "blur(6px)",
              zIndex: 0,
            }}
          />
        </motion.div>
      </motion.form>
    </div>
  );
}; 