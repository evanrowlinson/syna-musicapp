import React, { useState } from 'react';
import { useGenArt } from '../hooks/useArtGen';
import { CoverArt } from './CoverArt';

export const ResultsContainer = ({
  loading,
  errors,
  playlist,
  dallePrompt,
  museumArtQueries,
  artworkArray
}) => {

  // Custom artwork generator (useArtGen)
  const [promptText, setPromptText] = useState('');
  const {
    imageURL,
    loading: artLoading,
    error: artError,
    generateArt
  } = useGenArt();

  // ----- SYNA Loading -----
  if (loading?.gpt || loading?.dalle || loading?.museum) {
    return <p>Generating your SYNA experience…</p>;
  }

  // ----- SYNA Errors -----
  if (errors?.gpt || errors?.dalle || errors?.museum) {
    return (
      <div className="error-banner">
        {errors.gpt && <p>Error generating playlist: {errors.gpt}</p>}
        {errors.dalle && <p>Error generating artwork: {errors.dalle}</p>}
        {errors.museum && <p>Error fetching museum art: {errors.museum}</p>}
      </div>
    );
  }

  return (
    <div className="results-container-module">


      {/*       SYNA Playlist       */}
      {playlist && playlist.length > 0 && (
        <section>
          <h2>Your SYNA Playlist</h2>
          <ul>
            {playlist.map((track, idx) => (
              <li key={idx}>
                {track.title ? (
                  <>
                    <strong>{track.title}</strong> — {track.artist}
                  </>
                ) : (
                  track
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*       SYNA Cover Art      */}
      {dallePrompt && (
        <section>
          <h2>SYNA Cover Art</h2>
          <img
            src={dallePrompt}
            alt="Generated cover art"
            style={{ width: '300px', borderRadius: '12px' }}
          />
        </section>
      )}

      {/*     SYNA Museum Art     */}
      {artworkArray && artworkArray.length > 0 && (
        <section>
          <h2>SYNA Museum Art</h2>
          <div className="museum-grid">
            {artworkArray.map((art, idx) => (
              <figure key={idx}>
                <img
                  src={art.primaryImageSmall}
                  alt={art.title}
                  style={{ width: '200px', borderRadius: '8px' }}
                />
                <figcaption>
                  {art.title} — {art.artistDisplayName}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/*   Custom Artwork Generation (useArtGen) */}
      <section>
        <h2>Generate Custom Artwork</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (promptText.trim() !== '') generateArt(promptText);
          }}
          className="prompt-form"
        >
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Enter a custom art prompt..."
            disabled={artLoading}
            className="prompt-input"
          />

          <button
            type="submit"
            disabled={artLoading || promptText.trim() === ''}
            className="generate-btn"
          >
            {artLoading ? 'Generating...' : 'Generate Artwork'}
          </button>
        </form>

        <CoverArt imageURL={imageURL} loading={artLoading} error={artError} />
      </section>

    </div>
  );
};
