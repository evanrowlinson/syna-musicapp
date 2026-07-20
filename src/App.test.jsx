import React, { useState } from 'react';
import { usePlaylist } from './usePlaylist';
import PlaylistDisplay from './PlaylistDisplay';
import SYNAForm from './components/SYNAForm';

export default function App() {
  const [formInputs, setFormInputs] = useState(null);
  const { data, loading, error } = usePlaylist(formInputs, { useMock: false });

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Ben's Integration Test — Real GPT Call</h1>
      </header>

      <SYNAForm onSubmit={setFormInputs} isLoading={loading} />

      <main style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <PlaylistDisplay data={data} loading={loading} error={error} />
      </main>
    </div>
  );
}