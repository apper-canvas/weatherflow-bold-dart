import currentWeatherData from '../mockData/currentWeather.json';
import forecastData from '../mockData/forecast.json';
import locationsData from '../mockData/locations.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const weatherService = {
  async getCurrentWeather(lat, lon, unit = 'metric') {
    await delay(300);
    
    // Simulate API response with mock data
    const weatherData = { ...currentWeatherData };
    
    // Convert temperature if needed
    if (unit === 'imperial') {
      weatherData.temperature = (weatherData.temperature * 9/5) + 32;
      weatherData.feelsLike = (weatherData.feelsLike * 9/5) + 32;
    }
    
    return weatherData;
  },

  async getForecast(lat, lon, unit = 'metric') {
    await delay(400);
    
    // Simulate API response with mock forecast data
    const forecast = [...forecastData];
    
    // Convert temperatures if needed
    if (unit === 'imperial') {
      forecast.forEach(day => {
        day.tempHigh = (day.tempHigh * 9/5) + 32;
        day.tempLow = (day.tempLow * 9/5) + 32;
      });
    }
    
    return forecast;
  },

  async searchLocations(query) {
    await delay(200);
    
    if (!query || query.length < 2) return [];
    
    // Filter locations based on query
    const filteredLocations = locationsData.filter(location =>
      location.city.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredLocations.slice(0, 5); // Return max 5 suggestions
  },

  async reverseGeocode(lat, lon) {
    await delay(300);
    
    // Simulate reverse geocoding - return a default location
    return {
      city: 'Current Location',
      country: 'US',
      lat: lat,
lon: lon,
      
      // Enhanced search that includes global cities
      async searchLocations(query) {
        await delay(300);
        
        // Filter global cities based on query
        const globalCities = locationsData.filter(location => 
          location.city.toLowerCase().includes(query.toLowerCase())
        );
        
        // For now, return filtered global cities
        // In a real app, you might combine with API results
        return globalCities.map(location => ({
          city: location.city,
          country: location.country,
          lat: location.lat,
          lon: location.lon,
          timezone: location.timezone
        }));
      },
      timezone: 'America/New_York'
    };
  }
};

export default weatherService;