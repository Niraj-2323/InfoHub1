import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherModule() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('London');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (c) => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`/api/weather?city=${encodeURIComponent(c)}`);
      setData(res.data);
    } catch (err) {
      console.error("Weather Error:", err);

     
      if (!data) {
        setError("Error fetching weather. Check server and API key.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather(city); }, []);

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input 
          value={city}
          onChange={e => setCity(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button 
          onClick={() => fetchWeather(city)} 
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          Get
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {/*Showing */}
      {error && !data && (
        <p className="text-red-600">{error}</p>
      )}

      {data && (
        <div className="mt-3">
          <h3 className="text-xl font-medium">{data.city}</h3>
          <p>Temperature: {data.temp} °C</p>
          <p>Feels like: {data.feels_like} °C</p>
          <p>Humidity: {data.humidity}%</p>
          <p>Condition: {data.description}</p>
        </div>
      )}
    </div>
  );
}
