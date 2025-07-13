import React, { useState, useEffect } from 'react';
import { AnimatedSkyBackground } from './AnimatedSkyBackground';

export const AnimatedSkyBackgroundDemo: React.FC = () => {
  // null = auto, true = night, false = day
  const [overrideNight, setOverrideNight] = useState<null | boolean>(null);
  const [autoNight, setAutoNight] = useState<boolean>(() => {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  });

  // Live update for auto mode
  useEffect(() => {
    if (overrideNight !== null) return;
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      setAutoNight(hour < 6 || hour >= 18);
    }, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [overrideNight]);

  // The value to pass to AnimatedSkyBackground
  const effectiveOverride = overrideNight === null ? autoNight : overrideNight;

  // Simple toggle handler
  const handleSimpleToggle = () => {
    setOverrideNight((prev) => {
      if (prev === null) return autoNight ? false : true; // If auto, switch to opposite of current
      return !prev;
    });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedSkyBackground overrideNight={effectiveOverride} />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Simple Day/Night Toggle Button */}
        <button
          className={`mb-8 px-6 py-3 rounded-lg font-bold text-lg shadow transition-colors ${
            effectiveOverride
              ? 'bg-slate-800 text-white'
              : 'bg-yellow-400 text-yellow-900'
          }`}
          onClick={handleSimpleToggle}
        >
          {effectiveOverride ? 'Switch to Day' : 'Switch to Night'}
        </button>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Animated Sky Background Demo
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors ${overrideNight === null ? 'bg-blue-600 text-white' : 'bg-white/80 text-blue-800'}`}
              onClick={() => setOverrideNight(null)}
            >
              Auto
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors ${overrideNight === false ? 'bg-yellow-400 text-yellow-900' : 'bg-white/80 text-yellow-900'}`}
              onClick={() => setOverrideNight(false)}
            >
              Day
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors ${overrideNight === true ? 'bg-slate-800 text-white' : 'bg-white/80 text-slate-800'}`}
              onClick={() => setOverrideNight(true)}
            >
              Night
            </button>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Features
            </h2>
            <ul className="text-white/90 space-y-2 text-left">
              <li>✨ Soft animated gradient sky</li>
              <li>☀️ Glowing sun with pulsing rays (day)</li>
              <li>🌙 Glowing moon and twinkling stars (night)</li>
              <li>☁️ Layered SVG clouds with parallax effect</li>
              <li>🐦 Animated birds flying across the screen (day)</li>
              <li>📱 Responsive design</li>
              <li>🖱️ Non-blocking (pointer-events: none)</li>
              <li>⏰ <b>Auto-switches</b> based on your local time</li>
              <li>🕹️ <b>Manual override</b> with toggle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 