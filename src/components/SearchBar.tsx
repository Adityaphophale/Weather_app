import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex gap-2 mb-8"
    >
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter city name"
          className="flex-1 px-4 py-3 bg-white/90 backdrop-blur-xl border border-white/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300 shadow-lg"
          disabled={loading}
        />
        <motion.button
          type="submit"
          disabled={loading || !city.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
        >
          <Search className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </form>
    </motion.div>
  );
};