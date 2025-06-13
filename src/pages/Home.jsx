import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { weatherService } from '../services';
import { toast } from 'react-toastify';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSuggestions] = useState([]);
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [weatherTheme, setWeatherTheme] = useState('cloudy');

  // Load saved preferences on mount
  useEffect(() => {
    const savedUnit = localStorage.getItem('weatherflow-unit') || 'metric';
    const savedLocation = JSON.parse(localStorage.getItem('weatherflow-location') || 'null');
    
    setUnit(savedUnit);
    
    if (savedLocation) {
      setCurrentLocation(savedLocation);
      loadWeatherData(savedLocation.lat, savedLocation.lon, savedUnit);
    } else {
      // Default to New York
      const defaultLocation = { city: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 };
      setCurrentLocation(defaultLocation);
      loadWeatherData(defaultLocation.lat, defaultLocation.lon, savedUnit);
    }
  }, []);

  const loadWeatherData = async (lat, lon, tempUnit = unit) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeather, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon, tempUnit),
        weatherService.getForecast(lat, lon, tempUnit)
      ]);
      
      setWeatherData(currentWeather);
      setForecast(forecastData);
      setWeatherTheme(getWeatherTheme(currentWeather.condition));
    } catch (err) {
      setError(err.message || 'Failed to load weather data');
      toast.error('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherTheme = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return 'sunny';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'rainy';
    if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) return 'snowy';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return 'stormy';
    return 'cloudy';
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const suggestions = await weatherService.searchLocations(query);
      setSuggestions(suggestions);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleLocationSelect = async (location) => {
    setCurrentLocation(location);
    setSearchQuery('');
    setSuggestions([]);
    localStorage.setItem('weatherflow-location', JSON.stringify(location));
    await loadWeatherData(location.lat, location.lon);
    toast.success(`Weather loaded for ${location.city}`);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationData = await weatherService.reverseGeocode(latitude, longitude);
          setCurrentLocation(locationData);
          localStorage.setItem('weatherflow-location', JSON.stringify(locationData));
          await loadWeatherData(latitude, longitude);
          toast.success('Location detected successfully');
        } catch (err) {
          toast.error('Failed to get location data');
          setLoading(false);
        }
      },
      (error) => {
        toast.error('Failed to get your location');
        setLoading(false);
      }
    );
  };

  const toggleUnit = async () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('weatherflow-unit', newUnit);
    
    if (currentLocation) {
      await loadWeatherData(currentLocation.lat, currentLocation.lon, newUnit);
    }
  };

  const getBackgroundClass = () => {
    switch (weatherTheme) {
      case 'sunny': return 'bg-gradient-sunny';
      case 'rainy': return 'bg-gradient-rainy';
      case 'snowy': return 'bg-gradient-snowy';
      case 'stormy': return 'bg-gradient-stormy';
      default: return 'bg-gradient-cloudy';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-all duration-500 ${getBackgroundClass()}`}
    >
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <MainFeature
          weatherData={weatherData}
          forecast={forecast}
          loading={loading}
          error={error}
          currentLocation={currentLocation}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchSuggestions={searchSuggestions}
          onSearch={handleSearch}
          onLocationSelect={handleLocationSelect}
          onGeolocation={handleGeolocation}
          unit={unit}
          onToggleUnit={toggleUnit}
          weatherTheme={weatherTheme}
          onRetry={() => currentLocation && loadWeatherData(currentLocation.lat, currentLocation.lon)}
        />
      </div>
    </motion.div>
  );
};

export default Home;