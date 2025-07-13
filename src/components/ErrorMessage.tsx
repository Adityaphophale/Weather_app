import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto mb-6"
    >
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onDismiss}
            className="ml-3 p-1 hover:bg-red-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};