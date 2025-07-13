import React from 'react';
import { motion } from 'framer-motion';

interface CloudDecorationProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  animationDelay?: number;
}

export const CloudDecoration: React.FC<CloudDecorationProps> = ({ 
  className = '', 
  size = 'medium',
  animationDelay = 0 
}) => {
  const sizeClasses = {
    small: 'w-16 h-12',
    medium: 'w-24 h-18',
    large: 'w-32 h-24'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, 10, 0],
        y: [0, -5, 0]
      }}
      transition={{ 
        opacity: { duration: 1, delay: animationDelay },
        scale: { duration: 1, delay: animationDelay },
        x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute ${sizeClasses[size]} ${className}`}
    >
      <svg viewBox="0 0 100 60" className="w-full h-full fill-white/80">
        <path d="M20,40 Q10,25 25,25 Q30,15 45,20 Q60,10 70,25 Q85,20 80,35 Q90,40 85,50 L25,50 Q10,50 20,40 Z" />
      </svg>
    </motion.div>
  );
};