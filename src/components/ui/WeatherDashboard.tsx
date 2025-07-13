import React, { useEffect, useState } from "react";
import { FaCloud, FaCloudRain, FaSun, FaWind, FaTint, FaCloudSun, FaCloudShowersHeavy, FaSnowflake, FaSmog, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const iconMap: Record<string, JSX.Element> = {
  Rain: <FaCloudRain />,
  Clouds: <FaCloud />,
  Clear: <FaSun />,
  "Clear Sky": <FaSun />,
  "Few Clouds": <FaCloudSun />,
  "Scattered Clouds": <FaCloud />,
  "Broken Clouds": <FaCloudSun />,
  "Shower Rain": <FaCloudShowersHeavy />,
  "Light Rain": <FaCloudShowersHeavy />,
  "Thunderstorm": <FaCloudShowersHeavy />,
  Snow: <FaSnowflake />,
  Mist: <FaSmog />,
  Haze: <FaSmog />,
  Fog: <FaSmog />,
  Smoke: <FaSmog />,
  Drizzle: <FaCloudShowersHeavy />,
};

function getDayName(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

const fallbackCurrent = {
  city: "Vadodara, IN",
  date: "Saturday, July 12, 2025",
  tempC: 33,
  tempF: 92,
  condition: "Broken clouds",
  icon: <FaCloud className="text-blue-400" />,
  wind: 6.3,
  humidity: 61,
};

const fallbackForecast = [
  { day: "Saturday", min: 33, max: 33, condition: "Broken clouds", icon: <FaCloud />, },
  { day: "Sunday", min: 31, max: 34, condition: "Rain", icon: <FaCloudRain />, },
  { day: "Monday", min: 30, max: 33, condition: "Cloudy", icon: <FaCloud />, },
  { day: "Tuesday", min: 29, max: 32, condition: "Sunny", icon: <FaSun />, },
  { day: "Wednesday", min: 28, max: 31, condition: "Rain", icon: <FaCloudRain />, },
];

export const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState("Vadodara,IN");
  const [inputCity, setInputCity] = useState("");
  const [current, setCurrent] = useState(fallbackCurrent);
  const [forecast, setForecast] = useState(fallbackForecast);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "f3e0662088f5d81b6f3d7b7a4bebf25b";

  const fetchWeather = (cityName: string) => {
    setLoading(true);
    setError("");
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    Promise.all([
      fetch(currentUrl).then(res => res.json()),
      fetch(forecastUrl).then(res => res.json()),
    ]).then(([currentData, forecastData]) => {
      if (currentData.cod !== 200) throw new Error(currentData.message || "City not found");
      // Current weather
      setCurrent({
        city: `${currentData.name}, ${currentData.sys.country}`,
        date: formatDate(new Date().toISOString()),
        tempC: Math.round(currentData.main.temp),
        tempF: Math.round((currentData.main.temp * 9) / 5 + 32),
        condition: currentData.weather[0].description.replace(/\b\w/g, l => l.toUpperCase()),
        icon: iconMap[currentData.weather[0].main] || iconMap[currentData.weather[0].description] || <FaCloud />,
        wind: currentData.wind.speed,
        humidity: currentData.main.humidity,
      });
      // 5-day forecast
      if (forecastData && forecastData.list) {
        const days: Record<string, any[]> = {};
        forecastData.list.forEach((item: any) => {
          const date = item.dt_txt.split(" ")[0];
          if (!days[date]) days[date] = [];
          days[date].push(item);
        });
        const result = Object.keys(days)
          .slice(0, 5)
          .map(date => {
            const dayData = days[date];
            const midday = dayData[Math.floor(dayData.length / 2)] || dayData[0];
            const main = midday.weather[0].main;
            const desc = midday.weather[0].description;
            return {
              day: getDayName(date),
              min: Math.round(Math.min(...dayData.map((d: any) => d.main.temp_min))),
              max: Math.round(Math.max(...dayData.map((d: any) => d.main.temp_max))),
              condition: desc.replace(/\b\w/g, l => l.toUpperCase()),
              icon: iconMap[main] || iconMap[desc] || <FaCloud />,
            };
          });
        setForecast(result);
      }
      setLoading(false);
    }).catch((err) => {
      setError(err.message || "Could not fetch weather data.");
      setCurrent(fallbackCurrent);
      setForecast(fallbackForecast);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-100 p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-xl flex items-center justify-center mb-6">
        <div className="flex w-full rounded-full bg-white/60 backdrop-blur-md shadow px-2 py-1">
          <input
            type="text"
            value={inputCity}
            onChange={e => setInputCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-800 placeholder:font-sans placeholder:font-semibold placeholder:tracking-wide placeholder:text-base placeholder:text-blue-400 rounded-full text-base transition-all duration-300 focus:bg-white/80"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 text-white w-12 h-12 ml-2 shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
      </form>
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 text-red-600 bg-red-100/80 rounded-lg px-4 py-2 shadow"
        >
          <FaExclamationTriangle className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}
      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-blue-500 text-lg font-semibold flex items-center gap-2"
        >
          <svg className="animate-spin h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading weather data...
        </motion.div>
      )}
      {/* Current Weather Section */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl rounded-3xl bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40 p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <div className="text-2xl font-bold text-blue-700 mb-1 flex items-center gap-2 tracking-wide">
              {current.city}
              {current.icon}
            </div>
            <div className="text-gray-500 text-sm mb-2">{current.date}</div>
            <div className="text-6xl font-black text-gray-900 mb-2 drop-shadow">{current.tempC}&deg;C <span className="text-2xl text-gray-400 font-normal">({current.tempF}&deg;F)</span></div>
            <div className="text-lg text-blue-500 mb-2 flex items-center gap-2 font-semibold">
              {current.condition}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <FaWind className="text-blue-400" />
              <span className="font-semibold">Wind:</span>
              <span className="text-blue-600 font-bold">{current.wind} m/s</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTint className="text-blue-300" />
              <span className="font-semibold">Humidity:</span>
              <span className="text-blue-600 font-bold">{current.humidity}%</span>
            </div>
          </div>
        </motion.div>
      )}
      {/* 5-Day Forecast Section */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-4xl flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {forecast.map((day, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.06, boxShadow: "0 0 24px #60a5fa55" }}
                className="flex flex-col items-center bg-white/40 backdrop-blur-lg rounded-2xl shadow-md px-6 py-5 min-w-[150px] max-w-[170px] border border-white/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-blue-500 text-lg font-semibold mb-1">{day.day}</div>
                <div className="text-4xl text-blue-400 mb-2">{day.icon}</div>
                <div className="text-lg font-bold text-blue-700 mb-1">{day.min}&deg;C / {day.max}&deg;C</div>
                <div className="text-center text-gray-700 text-sm mb-1">{day.condition}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 