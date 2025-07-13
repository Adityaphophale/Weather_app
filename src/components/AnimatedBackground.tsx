import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  // Clouds
  const clouds = [
    { id: 1, top: '5%', left: '5%', size: 90, delay: 0 },
    { id: 2, top: '20%', left: '10%', size: 50, delay: 2 },
    { id: 3, top: '70%', left: '12%', size: 80, delay: 1 },
  ];

  // Bokeh circles
  const bokehs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    size: Math.random() * 80 + 40,
    blur: Math.random() * 10 + 10,
    opacity: Math.random() * 0.2 + 0.08,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 5,
  }));

  // Sparkles
  const sparkles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Multi-stop gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-300 to-blue-300" />
      {/* Sun glow (radial gradient) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: 1 }}>
        <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-200/60 via-yellow-100/30 to-transparent" />
      </div>
      {/* Sun */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-yellow-200 shadow-2xl"
        style={{ zIndex: 2 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-yellow-100/60 to-transparent rounded-full"
          style={{ rotate: i * 45, zIndex: 1 }}
          animate={{ opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
        />
      ))}
      {/* Animated clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{ top: cloud.top, left: cloud.left, zIndex: 3 }}
          animate={{
            x: [0, 40, 0],
            y: [0, cloud.id % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{ duration: 30 + cloud.delay * 5, repeat: Infinity, delay: cloud.delay, ease: 'easeInOut' }}
        >
          <div
            className="drop-shadow-lg"
            style={{ width: cloud.size, height: cloud.size * 0.6 }}
          >
            <svg width={cloud.size} height={cloud.size * 0.6} viewBox={`0 0 ${cloud.size} ${cloud.size * 0.6}`} fill="none">
              <ellipse cx={cloud.size * 0.3} cy={cloud.size * 0.4} rx={cloud.size * 0.3} ry={cloud.size * 0.2} fill="#fff" />
              <ellipse cx={cloud.size * 0.6} cy={cloud.size * 0.3} rx={cloud.size * 0.25} ry={cloud.size * 0.18} fill="#fff" />
              <ellipse cx={cloud.size * 0.7} cy={cloud.size * 0.45} rx={cloud.size * 0.18} ry={cloud.size * 0.13} fill="#fff" />
              <rect x={cloud.size * 0.15} y={cloud.size * 0.4} width={cloud.size * 0.5} height={cloud.size * 0.18} rx={cloud.size * 0.09} fill="#fff" />
            </svg>
          </div>
        </motion.div>
      ))}
      {/* Bokeh circles */}
      {bokehs.map((bokeh) => (
        <motion.div
          key={bokeh.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: `${bokeh.x}%`,
            top: `${bokeh.y}%`,
            width: `${bokeh.size}px`,
            height: `${bokeh.size}px`,
            filter: `blur(${bokeh.blur}px)`,
            opacity: bokeh.opacity,
            zIndex: 2,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: bokeh.duration,
            repeat: Infinity,
            delay: bokeh.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Sparkles */}
      {sparkles.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            zIndex: 4,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Foreground silhouette (hills) */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" style={{ zIndex: 10 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 32" preserveAspectRatio="none" fill="none">
          <path d="M0 32 Q 20 10 40 28 T 100 32 V 32 H 0 Z" fill="#b6e0fe" fillOpacity="0.5" />
          <path d="M0 32 Q 30 18 60 30 T 100 32 V 32 H 0 Z" fill="#90cdf4" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}; 