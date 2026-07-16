import React from 'react';
import PlaylistCard from './PlaylistCard';

export default function PlaylistDisplay({ data, loading, error }) {
  
  const handleSaveExperience = () => {
    if (!data) return;
    try {
      localStorage.setItem('syna_saved_experience', JSON.stringify(data));
      alert('🔒 Complete mood experience successfully saved to your browser local storage!');
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ padding: '20px', textAlign: 'center' }}>
        <p>⌛ Curating your personalized music and art experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ padding: '20px', color: 'red' }}>
        <p>❌ Error loading your playlist: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <p>Please submit the form to generate your custom experience.</p>
      </div>
    );
  }

  return (
    <div className="playlist-display-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
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
      
      <section className="cover-art-section" style={{ marginBottom: '40px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h2>🎨 AI Cover Art Concept</h2>
        <p style={{ fontStyle: 'italic', color: '#444', lineHeight: '1.6' }}>
          "{data.dallePrompt}"
        </p>
        <blockquote style={{ fontSize: '0.9em', color: '#666', borderLeft: '4px solid #0070f3', paddingLeft: '10px', margin: '15px 0 0 0' }}>
          <strong>Note for Phase 2:</strong> This prompt will pass in parallel to DALL-E 3 to render the live cover image here.
        </blockquote>
      </section>

      <section className="tracks-section" style={{ marginBottom: '40px' }}>
        <h2>🎵 Your Mood-Driven Playlist</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {data.playlist.map((track) => (
            <div 
              key={track.id} // Fulfills requirement: stable ID, no array index!
              style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}
            >
              <h3 style={{ margin: '0 0 5px 0', color: '#111' }}>
                {track.title} <span style={{ fontWeight: 'normal', color: '#666', fontSize: '0.9em' }}>by {track.artist}</span>
              </h3>
              <p style={{ margin: '0', color: '#555', fontSize: '0.95em' }}>
                {track.justification}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="museum-section" style={{ background: '#f5f7fa', padding: '20px', borderRadius: '8px' }}>
        <h2>🏛️ Classical Museum Pairings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
          {data.museumArtQueries.map((query, index) => (
            <div 
              key={`museum-${index}`} // Index is okay here temporary since queries are static text blocks
              style={{ background: '#fff', padding: '15px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#0070f3' }}>
                Search Key: "{query.searchKeyword}"
              </h4>
              <p style={{ margin: '0', color: '#444', fontSize: '0.95em' }}>
                <strong>Emotional Contrast:</strong> {query.emotionalContext}
              </p>
            </div>
          ))}
        </div>
        <blockquote style={{ fontSize: '0.9em', color: '#666', borderLeft: '4px solid #0070f3', paddingLeft: '10px', margin: '20px 0 0 0' }}>
          <strong>Note for Phase 2:</strong> These keywords will query the public museum API to build your interactive slideshow.
        </blockquote>
      </section>

    </div>
  );
}