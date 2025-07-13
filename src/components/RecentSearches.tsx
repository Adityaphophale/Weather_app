import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trash2 } from 'lucide-react';
import { SearchHistory } from '../types/weather';

interface RecentSearchesProps {
  searches: SearchHistory[];
  onSearchSelect: (city: string) => void;
  onClearHistory: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSearchSelect,
  onClearHistory,
}) => {
  if (searches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-white/70 mr-2" />
            <h3 className="text-white/90 text-sm font-medium">Recent Searches</h3>
          </div>
          <button
            onClick={onClearHistory}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4 text-white/60 hover:text-white/80" />
          </button>
        </div>
        
        <div className="space-y-2">
          {searches.map((search, index) => (
            <motion.button
              key={search.city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSearchSelect(search.city)}
              className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/15 rounded-xl transition-all duration-200 text-white/80 hover:text-white text-sm"
            >
              {search.city}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};