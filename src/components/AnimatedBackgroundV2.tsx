import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundV2Props {
  className?: string;
}

export const AnimatedBackgroundV2: React.FC<AnimatedBackgroundV2Props> = ({ className = '' }) => {
  // Generate animated orbs
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 40,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  // Generate particle system
  const particles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 3,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated gradient background with more colors */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
            "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
            "linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)",
            "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Particle system */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 border-2 border-white/20 rounded-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated light beams */}
      <motion.div
        className="absolute top-0 left-1/3 w-2 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-2 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: 4,
          ease: "easeInOut",
        }}
      />

      {/* Animated circles */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-40 h-40 border border-white/10 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 border border-white/10 rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: 3,
          ease: "easeInOut",
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: [-100, 100],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-8 h-8 border border-white/20 transform rotate-45"
        animate={{
          y: [0, -30, 0],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-white/20 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Animated wave patterns */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/15 to-transparent"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated cloud-like shapes */}
      <motion.div
        className="absolute top-1/3 left-1/6 w-24 h-10 bg-white/10 rounded-full blur-md"
        animate={{
          x: [0, 60, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/6 w-20 h-8 bg-white/10 rounded-full blur-md"
        animate={{
          x: [0, -40, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}; 