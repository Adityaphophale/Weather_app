import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedSkyBackground
 *
 * Props:
 *   overrideNight?: boolean | null
 *     - true: force night mode
 *     - false: force day mode
 *     - null/undefined: auto-detect by local time (6:00–18:00 = day, else night)
 *   className?: string
 *
 * Usage:
 *   <AnimatedSkyBackground /> // auto
 *   <AnimatedSkyBackground overrideNight={true} /> // force night
 *   <AnimatedSkyBackground overrideNight={false} /> // force day
 */
interface AnimatedSkyBackgroundProps {
  overrideNight?: boolean | null;
  className?: string;
}

export const AnimatedSkyBackground: React.FC<AnimatedSkyBackgroundProps> = ({ overrideNight = null, className = '' }) => {
  // Compute isNight: manual override or auto by local time
  const isNight = useMemo(() => {
    if (overrideNight === true) return true;
    if (overrideNight === false) return false;
    // Auto: local time
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  }, [overrideNight]);

  // Cloud configurations
  const clouds = [
    { id: 1, top: '8%', left: '5%', size: 120, delay: 0, speed: 0.3, opacity: 0.7 },
    { id: 2, top: '25%', left: '15%', size: 80, delay: 2, speed: 0.3, opacity: 0.6 },
    { id: 3, top: '60%', left: '8%', size: 100, delay: 1, speed: 0.3, opacity: 0.8 },
    { id: 4, top: '15%', left: '25%', size: 90, delay: 3, speed: 0.6, opacity: 0.9 },
    { id: 5, top: '45%', left: '20%', size: 70, delay: 4, speed: 0.6, opacity: 0.8 },
    { id: 6, top: '75%', left: '30%', size: 110, delay: 2, speed: 0.6, opacity: 0.7 },
    { id: 7, top: '35%', left: '40%', size: 85, delay: 1, speed: 1, opacity: 1 },
    { id: 8, top: '55%', left: '35%', size: 95, delay: 3, speed: 1, opacity: 0.9 },
  ];

  // Night stars
  const stars = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 2 + 1.5,
  })), []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-colors duration-700 ${isNight ? 'bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900' : 'bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400'}`}></div>

      {/* Night: Moon and Stars */}
      {isNight && (
        <>
          {/* Moon with glow */}
          <div className="absolute top-10 right-10 w-32 h-32 flex items-center justify-center" style={{ zIndex: 3 }}>
            {/* Glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,210,0.18) 0%, rgba(255,255,210,0.08) 60%, transparent 100%)',
                zIndex: 1,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Moon */}
            <motion.div
              className="relative w-20 h-20 rounded-full bg-yellow-100 shadow-2xl"
              style={{ zIndex: 2 }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Crescent effect */}
              <div className="absolute left-6 top-2 w-14 h-16 rounded-full bg-slate-900/80" />
            </motion.div>
          </div>
          {/* Twinkling stars */}
          {stars.map(star => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full pointer-events-none"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                zIndex: 2,
                opacity: 0.8,
              }}
              animate={{ opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}

      {/* Day: Sun and Birds */}
      {!isNight && (
        <>
          {/* Sun and Glow */}
          <div className="absolute top-8 right-8 w-48 h-48 flex items-center justify-center" style={{ zIndex: 3, pointerEvents: 'none' }}>
            {/* Sun Glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-48 h-48 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(251,191,36,0.10) 60%, transparent 100%)',
                zIndex: 1,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Sun */}
            <motion.div
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-2xl"
              style={{ zIndex: 2 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Sun rays */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-40 h-1 bg-gradient-to-r from-yellow-200/70 to-transparent rounded-full"
                style={{
                  rotate: i * 30,
                  zIndex: 1,
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: '0 50%'
                }}
                animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </div>
          {/* Birds (sprite-based) */}
          <div className="bird-container bird-container--one">
            <div className="bird bird--one"></div>
          </div>
          <div className="bird-container bird-container--two">
            <div className="bird bird--two"></div>
          </div>
          <div className="bird-container bird-container--three">
            <div className="bird bird--three"></div>
          </div>
          <div className="bird-container bird-container--four">
            <div className="bird bird--four"></div>
          </div>
        </>
      )}

      {/* Layered SVG clouds with parallax effect (always visible) */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            zIndex: 3,
            opacity: cloud.opacity,
          }}
          animate={{
            x: [0, 60 * cloud.speed, 0],
            y: [0, cloud.id % 2 === 0 ? 15 : -15, 0],
          }}
          transition={{
            duration: 40 + cloud.delay * 3,
            repeat: Infinity,
            delay: cloud.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="drop-shadow-lg"
            style={{ width: cloud.size, height: cloud.size * 0.6 }}
          >
            <svg width={cloud.size} height={cloud.size * 0.6} viewBox={`0 0 ${cloud.size} ${cloud.size * 0.6}`} fill="none">
              <ellipse cx={cloud.size * 0.3} cy={cloud.size * 0.4} rx={cloud.size * 0.3} ry={cloud.size * 0.2} fill="#fff" />
              <ellipse cx={cloud.size * 0.6} cy={cloud.size * 0.3} rx={cloud.size * 0.25} ry={cloud.size * 0.18} fill="#fff" />
              <ellipse cx={cloud.size * 0.7} cy={cloud.size * 0.45} rx={cloud.size * 0.18} ry={cloud.size * 0.13} fill="#fff" />
              <ellipse cx={cloud.size * 0.2} cy={cloud.size * 0.35} rx={cloud.size * 0.2} ry={cloud.size * 0.15} fill="#fff" />
              <rect x={cloud.size * 0.15} y={cloud.size * 0.4} width={cloud.size * 0.5} height={cloud.size * 0.18} rx={cloud.size * 0.09} fill="#fff" />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Subtle floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            zIndex: 2,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Foreground gradient overlay for depth */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" style={{ zIndex: 5 }}>
        <div className="w-full h-full bg-gradient-to-t from-sky-200/30 via-transparent to-transparent" />
      </div>
    </div>
  );
}; 