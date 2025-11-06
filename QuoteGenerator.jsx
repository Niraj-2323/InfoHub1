import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/quote');
      setQuote(res.data.quote);
    } catch (err) {
      setQuote('Could not fetch quote.');
    } finally { setLoading(false); }
  };

  useEffect(() => { getQuote(); }, []);

  return (
    <div>
      <button onClick={getQuote} className="px-4 py-2 bg-sky-600 text-white rounded mb-3">New Quote</button>
      {loading ? <p>Loading...</p> : <p className="italic">"{quote}"</p>}
    </div>
  );
}
