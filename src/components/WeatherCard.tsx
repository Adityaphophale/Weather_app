import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { WeatherData, ForecastData } from '../types/weather';
import { formatTemperature, formatDate, formatDayName, capitalizeWords, getWeatherEmoji } from '../utils/weatherUtils';

interface WeatherCardProps {
  data: WeatherData;
  forecast?: ForecastData | null;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, forecast }) => {
  const currentDate = new Date();
  
  // Process forecast data to get daily forecasts
  const dailyForecasts = forecast?.list.reduce((acc: Array<{
    date: string;
    day: string;
    temp_min: number;
    temp_max: number;
    weather: { main: string; description: string };
    emoji: string;
  }>, item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    
    if (!acc.find(day => day.date === dayKey) && acc.length < 5) {
      acc.push({
        date: dayKey,
        day: formatDayName(item.dt),
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0],
        emoji: getWeatherEmoji(item.weather[0].main)
      });
    }
    
    return acc;
  }, []) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 max-w-md mx-auto"
    >
      {/* Location and Date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-gray-600 text-sm">
          {formatDate(currentDate)}
        </p>
      </motion.div>

      {/* Main Weather Display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl mr-4">{getWeatherEmoji(data.weather[0].main)}</span>
          <div className="text-right">
            <div className="text-5xl font-light text-gray-800">
              {formatTemperature(data.main.temp)}
              <span className="text-2xl text-gray-600">C</span>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-2xl text-gray-600">
                {Math.round((data.main.temp * 9/5) + 32)}°F
              </span>
            </div>
          </div>
        </div>
        <p className="text-blue-600 text-lg font-medium">
          {capitalizeWords(data.weather[0].description)}
        </p>
      </motion.div>

      {/* Weather Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center gap-12 mb-8"
      >
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              x: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Wind className="w-5 h-5 text-gray-600 mr-2" />
          </motion.div>
          <div>
            <motion.p 
              className="text-lg font-semibold text-gray-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              {data.wind.speed}m/s
            </motion.p>
            <p className="text-sm text-gray-600">Wind speed</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-5 h-5 mr-2 flex items-center justify-center relative">
            <motion.div 
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute w-2 h-2 bg-blue-300 rounded-full"
              animate={{ 
                scale: [0.5, 0.8, 0.5],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </div>
          <div>
            <motion.p 
              className="text-lg font-semibold text-gray-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            >
              {data.main.humidity}%
            </motion.p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 5-Day Forecast */}
      {dailyForecasts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            5-Day Forecast:
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {dailyForecasts.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">{day.day}</p>
                <div className="text-2xl mb-2">{day.emoji}</div>
                <div className="text-xs text-gray-600">
                  <p className="font-semibold">{formatTemperature(day.temp_max)}</p>
                  <p className="text-gray-500">{formatTemperature(day.temp_min)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};