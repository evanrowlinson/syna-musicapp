import { useState } from 'react';

const SYNAForm = ({ onSubmit, isLoading }) => {
  const [mood, setMood] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [artists, setArtists] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim() === '') return;
    onSubmit({ mood: mood.trim(), artists });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="mood">Describe your mood or vibe</label>
        <input
          id="mood"
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

      <button
        type="submit"
        disabled={isLoading || mood.trim() === ''}
      >
        {isLoading ? 'Generating your experience...' : 'Generate My Experience'}
      </button>
    </form>
  );
};

export default SYNAForm;
