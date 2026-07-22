const SavedExperiences = ({ experiences, onDelete, onSelect }) => {
  if (experiences.length === 0) {
    return (
      <div className="saved-experiences-empty">
        <p>No saved experiences yet — generate a playlist and save it to see it here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="saved-experiences-heading">Saved Experiences</h2>
      <ul className="saved-experiences-list">
        {experiences.map((exp) => (
          <li
            key={exp.id}
            className="saved-experience-item"
          >
            <button
              type="button"
              className="saved-experience-delete"
              onClick={() => onDelete(exp.id)}
              aria-label={`Delete saved experience for ${exp.inputs?.mood ?? 'this entry'}`}
              style={{ position: 'absolute', top: '6px', right: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '0.9em', lineHeight: 1 }}
            >
              ×
            </button>

            <button
              type="button"
              className="saved-experience-select"
              onClick={() => onSelect?.(exp)}
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', font: 'inherit', paddingRight: '18px' }}
            >
              <strong className="saved-experience-mood">{exp.inputs?.mood ?? 'Untitled mood'}</strong>
              <div className="saved-experience-meta">
                {new Date(exp.savedAt).toLocaleString()} · {exp.playlist?.length ?? 0} tracks
              </div>
            </button>

            {exp.playlist?.length > 0 && (
              <ul className="saved-experience-tracks">
                {exp.playlist.map((track) => (
                  <li
                    key={track.id}
                    className="saved-experience-track"
                    style={{ fontSize: '0.8em', color: '#444', padding: '1px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    title={`${track.title} — ${track.artist}`}
                  >
                    {track.title} <span style={{ color: "var(--text-muted)" }}>— {track.artist}</span>
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
