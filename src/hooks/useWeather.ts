import { useState, useCallback } from 'react';
import { WeatherData, ForecastData } from '../types/weather';

const API_KEY = 'f3e0662088f5d81b6f3d7b7a4bebf25b'; // Placeholder API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (weatherResponse.status === 401) {
          throw new Error('API key invalid. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }

      const weatherData: WeatherData = await weatherResponse.json();

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (forecastResponse.ok) {
        const forecastData: ForecastData = await forecastResponse.json();
        setForecastData(forecastData);
      }

      setWeatherData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
    clearError,
  };
};