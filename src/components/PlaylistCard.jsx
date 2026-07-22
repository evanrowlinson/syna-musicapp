import React from 'react';

export default function PlaylistCard({ track }) {
  return (
    <div className="track_">
      <h3 style={{ margin: '0 0 5px 0', color: 'var(--text)' }}>
        {track.title} <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', fontSize: '0.9em' }}>by {track.artist}</span>
      </h3>
      <p style={{ margin: '0', color: 'var(--text-muted)', fontSize: '0.95em' }}>
        {track.justification}
      </p>
    </div>
  );
}
