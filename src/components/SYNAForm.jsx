import { useState } from 'react';

const GENRE_OPTIONS = [
  'Pop', 'Hip-Hop', 'R&B', 'Rock', 'Electronic',
  'Indie', 'Jazz', 'Classical', 'Country', 'Lo-fi',
];

const OCCASION_OPTIONS = [
  'Solo listening', 'Studying / focus', 'Workout',
  'Party', 'Road trip', 'Relaxing at home', 'Date night',
];

const MAX_GENRES = 3;

const SYNAForm = ({ onSubmit, isLoading }) => {
  const [mood, setMood] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [energy, setEnergy] = useState('Medium');
  const [occasion, setOccasion] = useState('');
  const [discovery, setDiscovery] = useState(50);

  const handleAddArtist = () => {
    const trimmed = artistInput.trim();
    if (trimmed !== '' && artists.length < 3 && !artists.includes(trimmed)) {
      setArtists([...artists, trimmed]);
      setArtistInput('');
    }
  };

  const handleRemoveArtist = (name) => {
    setArtists(artists.filter((a) => a !== name));
  };

  const handleToggleGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else if (genres.length < MAX_GENRES) {
      setGenres([...genres, genre]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim() === '') return;
    onSubmit({
      mood: mood.trim(),
      artists,
      genres,
      energy,
      occasion,
      discovery,
    });
  };

  return (
    <form className="syna-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="mood">Describe your mood or vibe</label>
        <input
          id="mood"
          className="syna-input"
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. late-night calm, soft focus, unwinding"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="artistInput">Anchor artists (up to 3)</label>
        <input
          id="artistInput"
          type="text"
          className="syna-input"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          placeholder="e.g. Frank Ocean"
          disabled={isLoading || artists.length >= 3}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddArtist();
            }
          }}
        />
        <button
          type="button"
          className="syna-btn"
          onClick={handleAddArtist}
          disabled={isLoading || artists.length >= 3 || artistInput.trim() === ''}
        >
          Add
        </button>
      </div>

      {artists.length > 0 && (
        <ul>
          {artists.map((artist) => (
            <li key={artist}>
              {artist}
              <button
                type="button"
                onClick={() => handleRemoveArtist(artist)}
                disabled={isLoading}
                aria-label={`Remove ${artist}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <span id="genre-label">Genres (up to {MAX_GENRES})</span>
        <div role="group" aria-labelledby="genre-label" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
          {GENRE_OPTIONS.map((genre) => {
            const selected = genres.includes(genre);
            return (
              <button
                key={genre}
                type="button"
                className="genre-chip"
                onClick={() => handleToggleGenre(genre)}
                disabled={isLoading || (!selected && genres.length >= MAX_GENRES)}
                aria-pressed={selected}
                style={{
                  borderRadius: '999px',
                  border: selected ? '1px solid #0070f3' : '1px solid #ccc',
                  background: selected ? '#0070f3' : '#fff',
                  color: selected ? '#fff' : '#333',
                  padding: '4px 12px',
                  cursor: 'pointer',
                }}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span id="energy-label">Energy</span>
        <div role="group" aria-labelledby="energy-label" style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          {['Low', 'Medium', 'High'].map((level) => (
            <button
              key={level}
              type="button"
              className="genre-chip"
              onClick={() => setEnergy(level)}
              disabled={isLoading}
              aria-pressed={energy === level}
              style={{
                border: energy === level ? '1px solid #0070f3' : '1px solid #ccc',
                background: energy === level ? '#0070f3' : '#fff',
                color: energy === level ? '#fff' : '#333',
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          className="syna-input"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          disabled={isLoading}
        >
          <option value="">No specific occasion</option>
          {OCCASION_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="discovery">
          Discovery: {discovery < 34 ? 'Stick to familiar' : discovery < 67 ? 'A healthy mix' : 'Surprise me'}
        </label>
        <input
          id="discovery"
          type="range"
          min="0"
          max="100"
          value={discovery}
          onChange={(e) => setDiscovery(Number(e.target.value))}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="syna-btn"
        disabled={isLoading || mood.trim() === ''}
      >
        {isLoading ? 'Generating your experience...' : 'Generate My Experience'}
      </button>
    </form>
  );
};

export default SYNAForm;
