import React, { useState } from 'react';
import axios from 'axios';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/currency?amount=${amount}`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: 'Conversion failed' });
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
          className="border p-2 rounded w-40" />
        <button onClick={convert} className="px-4 py-2 bg-sky-600 text-white rounded">Convert</button>
      </div>

      {loading && <p>Loading...</p>}

      {result && result.error && <p className="text-red-600">{result.error}</p>}
      {result && !result.error && (
          <div>
            <p className="font-medium">{amount} INR</p>
            <p>≈ {result.USD} USD</p>
            <p>≈ {result.EUR} EUR</p>
          </div>
        )}
    </div>
  );
}
