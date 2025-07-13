import React, { useEffect, useState } from "react";
import { FaCloudRain, FaCloud, FaSun } from "react-icons/fa";

const iconMap: Record<string, JSX.Element> = {
  Rain: <FaCloudRain />,
  Clouds: <FaCloud />,
  Clear: <FaSun />,
  // Add more mappings as needed
};

interface ForecastDay {
  date: string;
  temp: number;
  icon: JSX.Element;
  condition: string;
}

export function FiveDayForecast() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const city = "Vadodara";
    const apiKey = "f3e0662088f5d81b6f3d7b7a4bebf25b";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const days: Record<string, any[]> = {};
        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(" ")[0];
          if (!days[date]) days[date] = [];
          days[date].push(item);
        });
        const result: ForecastDay[] = Object.keys(days)
          .slice(0, 5)
          .map(date => {
            const dayData = days[date];
            const midday = dayData[Math.floor(dayData.length / 2)] || dayData[0];
            return {
              date,
              temp: Math.round(midday.main.temp),
              icon: iconMap[midday.weather[0].main] || <FaCloud />,
              condition: midday.weather[0].description.replace(/\b\w/g, l => l.toUpperCase()),
            };
          });
        setForecast(result);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {forecast.map((day, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl shadow-md px-6 py-4 min-w-[140px] max-w-[160px] transition hover:shadow-xl"
          >
            <div className="text-gray-500 text-sm mb-2">{day.date}</div>
            <div className="text-4xl text-gray-700 mb-2">{day.icon}</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{day.temp}&deg;C</div>
            <div className="text-center text-gray-600 text-sm">{day.condition}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 