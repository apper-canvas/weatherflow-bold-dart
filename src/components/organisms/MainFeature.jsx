import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchInputWithSuggestions from '@/components/molecules/SearchInputWithSuggestions';
import WeatherDetailItem from '@/components/molecules/WeatherDetailItem';
import ForecastCard from '@/components/molecules/ForecastCard';

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
        <Button
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          icon="RefreshCw"
          iconClass="w-5 h-5"
        >
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchInputWithSuggestions
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchSuggestions={searchSuggestions}
          onSearch={onSearch}
          onLocationSelect={onLocationSelect}
        />

        <div className="flex gap-2">
          <Button
            onClick={onGeolocation}
            className="glass-effect p-3 rounded-lg hover:bg-white/20 transition-all duration-200"
            title="Use current location"
            icon="MapPin"
            iconClass="w-6 h-6 text-gray-700"
          />
          
          <Button
            onClick={onToggleUnit}
            className="glass-effect px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium text-gray-700"
          >
            {unit === 'metric' ? '°F' : '°C'}
          </Button>
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
            <WeatherDetailItem 
              iconName="Droplets" 
              iconClass="text-blue-500" 
              label="Humidity" 
              value={`${weatherData.humidity}%`} 
            />
            
            <WeatherDetailItem 
              iconName="Wind" 
              iconClass="text-gray-500" 
              label="Wind Speed" 
              value={`${weatherData.windSpeed} ${getWindUnit()}`} 
            />
            
            <WeatherDetailItem 
              iconName="Eye" 
              iconClass="text-purple-500" 
              label="Visibility" 
              value="10 km" 
            />
            
            <WeatherDetailItem 
              iconName="Gauge" 
              iconClass="text-green-500" 
              label="Pressure" 
              value="1013 hPa" 
            />
          </div>
        </motion.div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <ForecastCard
                key={day.date}
                day={day}
                index={index}
                formatDate={formatDate}
                getWeatherIcon={getWeatherIcon}
                getUnitSymbol={getUnitSymbol}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainFeature;