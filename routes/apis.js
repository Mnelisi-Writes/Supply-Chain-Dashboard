const axios = require('axios');
const express = require('express');
const router = express.Router();

// Google Maps Route Optimization
router.post('/optimize-route', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    const route = await getOptimalRoute(origin, destination);
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch route' });
  }
});

// Weather Risk Alerts
router.post('/weather-risk', async (req, res) => {
  try {
    const { location } = req.body;
    const willRain = await checkWeatherRisk(location);
    res.json({ risk: willRain ? "Rain delay expected" : "No weather risk" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Helper Functions
async function getOptimalRoute(origin, destination) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return response.data.routes[0]; // Return the first route
}

async function checkWeatherRisk(location) {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=1`
  );
  return response.data.forecast.forecastday[0].day.daily_will_it_rain === 1;
}

module.exports = router;