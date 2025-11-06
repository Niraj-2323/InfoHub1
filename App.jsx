import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

export default function App() {
  const [active, setActive] = useState('Weather');
  return (
    <div className="container p-6">
      <h1 className="text-3xl font-semibold mb-4">InfoHub</h1>
      <div className="flex gap-3 mb-6">
        {['Weather','Currency','Quote'].map(tab => (
          <button key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded ${active===tab ? 'bg-sky-600 text-white' : 'bg-white border'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="card">
        {active === 'Weather' && <WeatherModule />}
        {active === 'Currency' && <CurrencyConverter />}
        {active === 'Quote' && <QuoteGenerator />}
      </div>
    </div>
  );
}
