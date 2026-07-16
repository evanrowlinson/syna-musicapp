const SavedExperiences = ({ experiences, onDelete, onSelect }) => {
  if (experiences.length === 0) {
    return (
      <div style={{ width: '280px', boxSizing: 'border-box', padding: '16px', color: '#666', fontSize: '0.9em' }}>
        <p>No saved experiences yet — generate a playlist and save it to see it here.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '280px', height: '100%', overflowY: 'auto', boxSizing: 'border-box', padding: '16px' }}>
      <h2 style={{ fontSize: '1.1em', marginTop: 0 }}>Saved Experiences</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {experiences.map((exp) => (
          <li
            key={exp.id}
            style={{ position: 'relative', border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}
          >
            <button
              type="button"
              onClick={() => onDelete(exp.id)}
              aria-label={`Delete saved experience for ${exp.inputs?.mood ?? 'this entry'}`}
              style={{ position: 'absolute', top: '6px', right: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '0.9em', lineHeight: 1 }}
            >
              ×
            </button>

            <button
              type="button"
              onClick={() => onSelect?.(exp)}
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', font: 'inherit', paddingRight: '18px' }}
            >
              <strong style={{ fontSize: '0.95em' }}>{exp.inputs?.mood ?? 'Untitled mood'}</strong>
              <div style={{ fontSize: '0.75em', color: '#666' }}>
                {new Date(exp.savedAt).toLocaleString()} · {exp.playlist?.length ?? 0} tracks
              </div>
            </button>

            {exp.playlist?.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
                {exp.playlist.map((track) => (
                  <li
                    key={track.id}
                    style={{ fontSize: '0.8em', color: '#444', padding: '1px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    title={`${track.title} — ${track.artist}`}
                  >
                    {track.title} <span style={{ color: '#888' }}>— {track.artist}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedExperiences;
