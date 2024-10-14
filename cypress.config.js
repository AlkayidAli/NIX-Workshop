const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

module.exports = defineConfig({
  viewportWidth: 1920, 
  viewportHeight: 1080,
  weatherApiUrl: `https://api.weatherapi.com/v1/forecast.json?key=${dotenv.config().parsed.WEATHER_API_KEY}`,
  e2e: {
    baseUrl: 'http://localhost:8081/',
    testIsolation: false,

  },
});
