require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

// Simple quotes array (mock data)
const quotes = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Strive not to be a success, but rather to be of value. — Albert Einstein",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill"
];

// GET /api/quote
app.get('/api/quote', (req, res) => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: q });
});

// GET /api/weather?city=CityName
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const key = process.env.OPENWEATHER_KEY;
  try {
    const geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`).then(r=>r.json());
    if (!geo.length) return res.status(404).json({ error: "City not found" });
    const { lat, lon, name, country } = geo[0];
    const w = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`).then(r=>r.json());
    res.json({
      city: `${name}, ${country}`,
      temp: w.main.temp,
      feels_like: w.main.feels_like,
      humidity: w.main.humidity,
      description: w.weather[0].description
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});


// GET /api/currency?amount=100
app.get('/api/currency', async (req, res) => {
  const amount = Number(req.query.amount);

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    // Fully free reliable currency API
    const response = await fetch(
      "https://open.er-api.com/v6/latest/INR"
    );
    const data = await response.json();

    const usdRate = data.rates.USD;
    const eurRate = data.rates.EUR;

    res.json({
      amount,
      base: "INR",
      USD: (amount * usdRate).toFixed(2),
      EUR: (amount * eurRate).toFixed(2)
    });

  } catch (err) {
    console.log("Currency API Error:", err);
    res.status(500).json({ error: "Conversion failed" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
