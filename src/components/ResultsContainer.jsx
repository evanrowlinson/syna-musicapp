import React from "react";
import PlaylistDisplay from "src/PlaylistDisplay.jsx";
import CoverArt from "./CoverArt";
import ArtSlideshow from "./ArtSlideshow";

const ResultsContainer = ({
  loading,
  error,
  playlist,
  coverImageURL,
  museumArtQueries,
  artworkArray,
  loadingMuseum,
  errorMuseum,
  saveExperience,
}) => {
  if (loading === true || loadingMuseum === true) {
    return <p>Generating your SYNA experience…</p>;
  }

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

      {playlist.length > 0 && (
        <section>
          <h2>Your SYNA Playlist</h2>
          <PlaylistDisplay
            data={{ playlist, dallePrompt: null, museumArtQueries }}
            loading={loading}
            error={error}
          />
        </section>
      )}

      {coverImageURL && (
        <section>
          <h2>SYNA Cover Art</h2>
          <CoverArt imageURL={coverImageURL} />
        </section>
      )}

      {artworkArray.length > 0 && (
        <section>
          <h2>SYNA Museum Art</h2>
          <ArtSlideshow
            artworkArray={artworkArray}
            loadingMuseum={loadingMuseum}
            errorMuseum={errorMuseum}
          />
        </section>
      )}
    </div>
  );
};

export default ResultsContainer;
