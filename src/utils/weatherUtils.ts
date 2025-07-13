import { WeatherData } from '../types/weather';

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const saveToSearchHistory = (city: string): void => {
  const history = getSearchHistory();
  const newEntry = { city, timestamp: Date.now() };
  
  // Remove if already exists
  const filteredHistory = history.filter(item => item.city.toLowerCase() !== city.toLowerCase());
  
  // Add to beginning and keep only last 5
  const updatedHistory = [newEntry, ...filteredHistory].slice(0, 5);
  
  localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
};

export const getSearchHistory = (): Array<{ city: string; timestamp: number }> => {
  try {
    const history = localStorage.getItem('weatherSearchHistory');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const getWeatherEmoji = (condition: string): string => {
  const normalizedCondition = condition.toLowerCase();
  
  if (normalizedCondition.includes('clear') || normalizedCondition.includes('sunny')) {
    return '☀️';
  } else if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
    return '🌧️';
  } else if (normalizedCondition.includes('cloud')) {
    return '☁️';
  } else if (normalizedCondition.includes('snow')) {
    return '❄️';
  } else if (normalizedCondition.includes('thunder')) {
    return '⛈️';
  } else if (normalizedCondition.includes('mist') || normalizedCondition.includes('fog')) {
    return '🌫️';
  }
  
  return '🌤️';
};