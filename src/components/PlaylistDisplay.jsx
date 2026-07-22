import React from 'react';
import PlaylistCard from './PlaylistCard';

export default function PlaylistDisplay({ data, loading, error, saveExperience, userInputs }) {

  const handleSaveExperience = () => {
    if (!data) return;
    try {
      saveExperience({ inputs: userInputs, ...data });
      alert('🔒 Complete mood experience successfully saved!');
    } catch (err) {
      alert('⚠️ Could not save your experience. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="playlist-panel">
        <p>⌛ Curating your personalized music and art experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="art-error-container">
        <p>❌ Error loading your playlist: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="playlist-panel">
        <p>Please submit the form to generate your custom experience.</p>
      </div>
    );
  }

  return (
    <div className="playlist-panel">
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          className="syna-btn"
          onClick={handleSaveExperience}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          💾 Save Complete Experience
        </button>
      </div>
      
      <section className="syna-panel" style={{ marginBottom: '24px' }}>
        <h2>🎨 AI Cover Art Concept</h2>
        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          "{data.dallePrompt}"
        </p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2>🎵 Your Mood-Driven Playlist</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {data.playlist.map((track) => (
            <PlaylistCard 
              key={track.id} 
              track={track} 
            />
          ))}
        </div>
      </section>

      <section className="museum-panel" style={{ background: '#f5f7fa', padding: '20px', borderRadius: '8px' }}>
        <h2>🏛️ Classical Museum Pairings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
          {data.museumArtQueries.map((query) => (
            <div 
              key={query.id}
              className="syna-panel">
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--accent-blue)' }}>
                {query.museum?.toUpperCase()} — Object {query.objectId}
              </h4>
              <p style={{ margin: '0', color: 'var(--text-muted)', fontSize: '0.95em' }}>
                <strong>Emotional Contrast:</strong> {query.emotionalContext}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
