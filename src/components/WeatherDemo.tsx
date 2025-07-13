import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';

interface WeatherDemoProps {
  onWeatherChange: (weatherData: WeatherData) => void;
}

export const WeatherDemo: React.FC<WeatherDemoProps> = ({ onWeatherChange }) => {
  const [activeDemo, setActiveDemo] = useState<string>('');

  const demoWeathers = [
    {
      name: 'Sunny Day',
      weatherData: {
        name: 'Demo City',
        main: { temp: 25, humidity: 60, feels_like: 26, temp_min: 20, temp_max: 30 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 5 },
        sys: { country: 'Demo' }
      } as WeatherData
    },
    {
      name: 'Cloudy Day',
      weatherData: {
        name: 'Demo City',
        main: { temp: 18, humidity: 75, feels_like: 17, temp_min: 15, temp_max: 22 },
        weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
        wind: { speed: 8 },
        sys: { country: 'Demo' }
      } as WeatherData
    },
    {
      name: 'Rainy Day',
      weatherData: {
        name: 'Demo City',
        main: { temp: 12, humidity: 90, feels_like: 10, temp_min: 8, temp_max: 15 },
        weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
        wind: { speed: 12 },
        sys: { country: 'Demo' }
      } as WeatherData
    },
    {
      name: 'Night Time',
      weatherData: {
        name: 'Demo City',
        main: { temp: 8, humidity: 85, feels_like: 6, temp_min: 5, temp_max: 12 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01n' }],
        wind: { speed: 3 },
        sys: { country: 'Demo' }
      } as WeatherData
    }
  ];

  const handleDemoClick = (demo: typeof demoWeathers[0]) => {
    setActiveDemo(demo.name);
    onWeatherChange(demo.weatherData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200"
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Weather Demo</h3>
      <div className="space-y-2">
        {demoWeathers.map((demo) => (
          <motion.button
            key={demo.name}
            onClick={() => handleDemoClick(demo)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
              activeDemo === demo.name
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {demo.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}; 