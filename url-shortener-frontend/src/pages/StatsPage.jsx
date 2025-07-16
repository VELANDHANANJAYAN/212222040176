import React, { useState } from 'react';
import { getStats } from '../api';

export default function StatsPage() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await getStats(code);
      setStats(res.data);
    } catch (err) {
  console.error(err); 
  setStats({ error: 'Shortcode not found or expired' });
}

  };

  return (
    <div>
      <h2>Stats Viewer</h2>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter shortcode"
      />
      <button onClick={fetchStats}>Fetch</button>
      {stats && (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      )}
    </div>
  );
}
