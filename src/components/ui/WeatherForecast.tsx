import React from "react";
import { FaCloud, FaSun, FaCloudRain, FaSmog, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const currentWeather = {
  city: "Vadodara",
  temp: 31,
  condition: "Haze",
  aqi: 50,
  aqiLabel: "Good",
  feelsLike: 98,
  pollen: "Low",
};

const hourlyForecast = [
  { time: "2:00 pm", temp: 30, icon: <FaCloud /> },
  { time: "3:00 pm", temp: 31, icon: <FaCloudRain /> },
  { time: "4:00 pm", temp: 32, icon: <FaSun /> },
  { time: "5:00 pm", temp: 31, icon: <FaCloud /> },
  { time: "6:00 pm", temp: 29, icon: <FaSmog /> },
];

const threeDayForecast = [
  { date: "7/12", day: "Today", min: 28, max: 33, icon: <FaCloudRain />, condition: "Rain" },
  { date: "7/13", day: "Tomorrow", min: 27, max: 32, icon: <FaCloud />, condition: "Cloudy" },
  { date: "7/14", day: "Monday", min: 29, max: 34, icon: <FaSun />, condition: "Sunny" },
];

export const WeatherForecast: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
      {/* Current Weather Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 shadow-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <div className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            {currentWeather.city}
            <FaCloud className="text-blue-400" />
          </div>
          <div className="text-5xl font-extrabold text-gray-900 mb-2">{currentWeather.temp}&deg;C</div>
          <div className="text-lg text-gray-600 mb-2 flex items-center gap-2">
            <FaSmog className="text-yellow-400" /> {currentWeather.condition}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-semibold">AQI:</span>
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 font-bold">{currentWeather.aqi}</span>
            <span className="text-green-600">{currentWeather.aqiLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Feels like:</span>
            <span className="text-blue-600 font-bold">{currentWeather.feelsLike}&deg;F</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLeaf className="text-green-400" />
            <span className="font-semibold">Pollen:</span>
            <span className="text-green-600 font-bold">{currentWeather.pollen}</span>
          </div>
        </div>
      </motion.div>

      {/* Hourly Forecast Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl bg-gradient-to-r from-blue-50 via-white to-yellow-50 shadow p-4"
      >
        <div className="text-lg font-semibold text-gray-700 mb-3">Hourly Forecast</div>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 pb-2">
          {hourlyForecast.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center min-w-[70px] bg-white/80 rounded-xl shadow-sm p-2"
            >
              <div className="text-gray-500 text-xs mb-1">{h.time}</div>
              <div className="text-2xl text-blue-400 mb-1">{h.icon}</div>
              <div className="text-base font-bold text-gray-800">{h.temp}&deg;C</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Three-Day Forecast Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl bg-gradient-to-r from-blue-50 via-white to-yellow-50 shadow p-4"
      >
        <div className="text-lg font-semibold text-gray-700 mb-3">3-Day Forecast</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {threeDayForecast.map((d, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white/80 rounded-xl shadow-sm p-4"
            >
              <div className="text-xs text-gray-400 mb-1">{d.date}</div>
              <div className="text-base font-semibold text-gray-700 mb-1">{d.day}</div>
              <div className="text-2xl mb-1 text-blue-400">{d.icon}</div>
              <div className="text-sm text-gray-600 mb-1">{d.condition}</div>
              <div className="text-sm font-bold text-gray-800">
                {d.min}&deg; / {d.max}&deg;C
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}; 