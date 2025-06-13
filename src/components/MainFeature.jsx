import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';

const MainFeature = ({
  weatherData,
  forecast,
  loading,
  error,
  currentLocation,
  searchQuery,
  setSearchQuery,
  searchSuggestions,
  onSearch,
  onLocationSelect,
  onGeolocation,
  unit,
  onToggleUnit,
  weatherTheme,
  onRetry
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(query.length > 0);
  };

  const handleLocationClick = (location) => {
    onLocationSelect(location);
    setShowSuggestions(false);
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return 'Sun';
    if (conditionLower.includes('rain')) return 'CloudRain';
    if (conditionLower.includes('drizzle')) return 'CloudDrizzle';
    if (conditionLower.includes('snow')) return 'CloudSnow';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return 'Zap';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'Cloud';
    return 'Cloud';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getUnitSymbol = () => unit === 'metric' ? '°C' : '°F';
  const getWindUnit = () => unit === 'metric' ? 'km/h' : 'mph';

  // Loading State
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Search Bar Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="animate-pulse bg-white/20 h-12 rounded-lg flex-1 max-w-md"></div>
          <div className="flex gap-2">
            <div className="animate-pulse bg-white/20 h-12 w-12 rounded-lg"></div>
            <div className="animate-pulse bg-white/20 h-12 w-20 rounded-lg"></div>
          </div>
        </div>

        {/* Current Weather Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 text-center"
        >
          <div className="animate-pulse space-y-4">
            <div className="bg-white/20 h-8 w-48 mx-auto rounded"></div>
            <div className="bg-white/20 h-24 w-24 mx-auto rounded-full"></div>
            <div className="bg-white/20 h-16 w-32 mx-auto rounded"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/20 h-16 rounded-lg"></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Forecast Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-effect rounded-xl p-4 animate-pulse"
            >
              <div className="bg-white/20 h-4 w-16 mx-auto mb-3 rounded"></div>
              <div className="bg-white/20 h-12 w-12 mx-auto mb-3 rounded-full"></div>
              <div className="bg-white/20 h-4 w-12 mx-auto mb-1 rounded"></div>
              <div className="bg-white/20 h-3 w-8 mx-auto rounded"></div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-8 text-center"
      >
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Weather Data Unavailable</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ApperIcon name="RefreshCw" className="w-5 h-5 inline mr-2" />
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          
          <AnimatePresence>
            {showSuggestions && searchSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full glass-effect rounded-lg overflow-hidden z-10"
              >
                {searchSuggestions.map((location, index) => (
                  <motion.button
                    key={`${location.city}-${location.country}-${index}`}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    onClick={() => handleLocationClick(location)}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{location.city}</span>
                      <span className="text-gray-600 text-sm">{location.country}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGeolocation}
            className="glass-effect p-3 rounded-lg hover:bg-white/20 transition-all duration-200"
            title="Use current location"
          >
            <ApperIcon name="MapPin" className="w-6 h-6 text-gray-700" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleUnit}
            className="glass-effect px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium text-gray-700"
          >
            {unit === 'metric' ? '°F' : '°C'}
          </motion.button>
        </div>
      </div>

      {/* Current Weather */}
      {weatherData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {currentLocation?.city}, {currentLocation?.country}
            </h1>
            <p className="text-gray-600 capitalize">{weatherData.description}</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <motion.div
              className="weather-float"
              style={{ '--animation-delay': '0s' }}
            >
              <ApperIcon 
                name={getWeatherIcon(weatherData.condition)} 
                className={`w-24 h-24 text-gray-700 ${weatherTheme === 'sunny' ? 'weather-rotate' : ''}`}
              />
            </motion.div>
            
            <div className="text-center">
              <motion.div
                key={weatherData.temperature}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl md:text-7xl font-bold text-gray-800 font-heading"
              >
                {Math.round(weatherData.temperature)}{getUnitSymbol()}
              </motion.div>
              <p className="text-gray-600 text-lg mt-2">
                Feels like {Math.round(weatherData.feelsLike)}{getUnitSymbol()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-effect rounded-lg p-4 text-center">
              <ApperIcon name="Droplets" className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-lg font-semibold text-gray-800">{weatherData.humidity}%</p>
            </div>
            
            <div className="glass-effect rounded-lg p-4 text-center">
              <ApperIcon name="Wind" className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-lg font-semibold text-gray-800">{weatherData.windSpeed} {getWindUnit()}</p>
            </div>
            
            <div className="glass-effect rounded-lg p-4 text-center">
              <ApperIcon name="Eye" className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Visibility</p>
              <p className="text-lg font-semibold text-gray-800">10 km</p>
            </div>
            
            <div className="glass-effect rounded-lg p-4 text-center">
              <ApperIcon name="Gauge" className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Pressure</p>
              <p className="text-lg font-semibold text-gray-800">1013 hPa</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-effect rounded-xl p-4 text-center hover:shadow-lg transition-all duration-200"
              >
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {formatDate(day.date)}
                </p>
                
                <ApperIcon 
                  name={getWeatherIcon(day.condition)} 
                  className="w-10 h-10 text-gray-700 mx-auto mb-3" 
                />
                
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {Math.round(day.tempHigh)}{getUnitSymbol()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {Math.round(day.tempLow)}{getUnitSymbol()}
                  </p>
                </div>
                
                {day.precipitation > 0 && (
                  <div className="flex items-center justify-center mt-2">
                    <ApperIcon name="Droplets" className="w-3 h-3 text-blue-500 mr-1" />
                    <span className="text-xs text-gray-600">{day.precipitation}%</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainFeature;