import React, { useState } from 'react';
import { usePlaylist } from './usePlaylist';
import PlaylistDisplay from './PlaylistDisplay';

export default function App() {
  const [formInputs, setFormInputs] = useState(null);

  const { data, loading, error } = usePlaylist(formInputs, { useMock: true });

  const handleSimulateFormSubmit = () => {
    setFormInputs({
      mood: "Melancholic but Energetic",
      artists: ["The Weeknd", "Kavinsky"],
      genre: "Synthwave",
      energy: 8,
      activity: "Late Night Drive"
    });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Group Project Test Environment (Ben's Portion)</h1>
        <p>Testing async hooks, data contracts, and list rendering logic.</p>
        
        <button 
          onClick={handleSimulateFormSubmit} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'AI Engine Working...' : 'Simulate Form Submission'}
        </button>
      </header>

      <main style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <PlaylistDisplay data={data} loading={loading} error={error} />
      </main>
    </div>
  );
}