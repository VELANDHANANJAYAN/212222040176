import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import { createShortURL } from '../api';
export default function ShortenerPage() {
  const [results, setResults] = useState([]);
  const handleShorten = async (inputs) => {
  const newResults = [];

  for (const input of inputs) {
    const payload = {
      url: input.url,
    };

    if (input.validity) {
      payload.validity = parseInt(input.validity); // Must be integer
    }

    if (input.shortcode) {
      payload.shortcode = input.shortcode;
    }

    try {
      const res = await createShortURL(payload); // Sends JSON
      newResults.push(res.data);
    } catch (err) {
      newResults.push({ error: err.response?.data?.error || "Failed" });
    }
  }

  setResults(newResults);
};

  return (
    <div>
      <h2>Shorten URLs</h2>
      <UrlForm onShorten={handleShorten} />
      <div>
        {results.map((r, i) =>
          r.error ? (
            <p key={i} style={{ color: 'red' }}>{r.error}</p>
          ) : (
            <p key={i}><a href={r.shortlink}>{r.shortlink}</a> (Expires: {r.expiry})</p>
          )
        )}
      </div>
    </div>
  );
}
