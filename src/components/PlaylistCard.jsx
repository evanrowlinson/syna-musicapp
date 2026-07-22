import React from 'react';

export default function PlaylistCard({ track }) {
  return (
    <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#111' }}>
        {track.title} <span style={{ fontWeight: 'normal', color: '#666', fontSize: '0.9em' }}>by {track.artist}</span>
      </h3>
      <p style={{ margin: '0', color: '#555', fontSize: '0.95em' }}>
        {track.justification}
      </p>
    </div>
  );
}
