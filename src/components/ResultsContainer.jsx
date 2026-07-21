import React, { useState } from "react";
import PlaylistDisplay from "../PlaylistDisplay";
import CoverArt from "./CoverArt";
import ArtSlideshow from "./ArtSlideshow";
import { useGenArt } from "../hooks/useArtGen";

const ResultsContainer = ({
  loading,
  error,
  playlist,
  dallePrompt,
  museumArtQueries,
  artworkArray,
  loadingMuseum,
  errorMuseum
}) => {
  // Custom artwork generator (useArtGen)
  const [promptText, setPromptText] = useState("");
  const {
    imageURL,
    loading: artLoading,
    error: artError,
    generateArt
  } = useGenArt();

  // ----- GPT / DALL-E / Museum Loading -----
  if (loading === true || loadingMuseum === true) {
    return <p>Generating your SYNA experience…</p>;
  }

  // ----- GPT / DALL-E / Museum Errors -----
  if (error !== null || errorMuseum !== null) {
    return (
      <div className="error-banner">
        {error && <p>Error generating playlist: {error}</p>}
        {errorMuseum && <p>Error fetching museum art: {errorMuseum}</p>}
      </div>
    );
  }

  return (
    <div className="results-container-module">

      {/*       SYNA Playlist       */}
      {playlist && playlist.length > 0 && (
        <section>
          <h2>Your SYNA Playlist</h2>
          <PlaylistDisplay playlist={playlist} />
        </section>
      )}

      {/*       SYNA Cover Art      */}
      {dallePrompt && (
        <section>
          <h2>SYNA Cover Art</h2>
          <CoverArt dallePrompt={dallePrompt} />
        </section>
      )}

      {/*     SYNA Museum Art Slideshow     */}
      {artworkArray && artworkArray.length > 0 && (
        <section>
          <h2>SYNA Museum Art</h2>
          <ArtSlideshow
            artworkArray={artworkArray}
            loadingMuseum={loadingMuseum}
            errorMuseum={errorMuseum}
          />
        </section>
      )}

      {/*   Custom Artwork Generation (useArtGen) */}
      <section>
        <h2>Generate Custom Artwork</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (promptText.trim() !== "") generateArt(promptText);
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
            disabled={artLoading || promptText.trim() === ""}
            className="generate-btn"
          >
            {artLoading ? "Generating..." : "Generate Artwork"}
          </button>
        </form>

        <CoverArt imageURL={imageURL} loading={artLoading} error={artError} />
      </section>

    </div>
  );
};

export default ResultsContainer;
