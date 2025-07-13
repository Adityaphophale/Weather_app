import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CloudDecoration } from './components/CloudDecoration';
import { AnimatedSkyBackground } from './components/AnimatedSkyBackground';
import { HeroSection } from './components/HeroSection';
import { saveToSearchHistory } from './utils/weatherUtils';

function App() {
  const { weatherData, forecastData, loading, error, fetchWeather, clearError } = useWeather();

  // Day/Night/Auto toggle logic
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

  const handleSetAuto = () => setOverrideNight(null);
  const handleSetDay = () => setOverrideNight(false);
  const handleSetNight = () => setOverrideNight(true);

  const handleSearch = (city: string) => {
    fetchWeather(city);
    saveToSearchHistory(city);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Sky Background with dynamic override */}
      <AnimatedSkyBackground overrideNight={effectiveOverride} />

      {/* Toggle Controls */}
      <div className="absolute top-4 left-0 w-full flex flex-col items-center z-20">
        {/* Simple Day/Night Toggle Button */}
        <button
          className={`mb-2 px-6 py-2 rounded-lg font-bold text-base shadow transition-colors ${
            effectiveOverride
              ? 'bg-slate-800 text-white'
              : 'bg-yellow-400 text-yellow-900'
          }`}
          onClick={handleSimpleToggle}
        >
          {effectiveOverride ? 'Switch to Day' : 'Switch to Night'}
        </button>
        {/* Advanced Controls */}
        <div className="flex justify-center gap-2">
          <button
            className={`px-3 py-1 rounded font-semibold transition-colors ${overrideNight === null ? 'bg-blue-600 text-white' : 'bg-white/80 text-blue-800'}`}
            onClick={handleSetAuto}
          >
            Auto
          </button>
          <button
            className={`px-3 py-1 rounded font-semibold transition-colors ${overrideNight === false ? 'bg-yellow-400 text-yellow-900' : 'bg-white/80 text-yellow-900'}`}
            onClick={handleSetDay}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 rounded font-semibold transition-colors ${overrideNight === true ? 'bg-slate-800 text-white' : 'bg-white/80 text-slate-800'}`}
            onClick={handleSetNight}
          >
            Night
          </button>
        </div>
      </div>

      {/* Decorative Clouds */}
      <CloudDecoration 
        className="top-10 left-10" 
        size="large" 
        animationDelay={0} 
      />
      <CloudDecoration 
        className="top-20 right-20" 
        size="medium" 
        animationDelay={0.5} 
      />
      <CloudDecoration 
        className="bottom-32 left-16" 
        size="medium" 
        animationDelay={1} 
      />
      <CloudDecoration 
        className="bottom-20 right-10" 
        size="large" 
        animationDelay={1.5} 
      />
      <CloudDecoration 
        className="top-1/2 left-5" 
        size="small" 
        animationDelay={2} 
      />
      <CloudDecoration 
        className="top-1/3 right-5" 
        size="small" 
        animationDelay={2.5} 
      />

      <HeroSection>
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <ErrorMessage message={error} onDismiss={clearError} />
          )}
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && (
            <LoadingSpinner />
          )}
          {!loading && weatherData && (
            <WeatherCard data={weatherData} forecast={forecastData} />
          )}
          {!loading && !weatherData && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-6"
              >
                🌤️
              </motion.div>
              <p className="text-gray-700 text-lg">
                Search for a city to see its weather
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </HeroSection>
    </div>
  );
}

export default App;