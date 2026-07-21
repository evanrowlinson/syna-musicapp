import React from "react";
import ArtSlide from "./ArtSlide";

const ArtSlideshow = ({ artworkArray, loading, errors }) => {
  return (
    <div className="art-slideshow-container">
      {/* Placeholder — real slideshow logic comes in Phase 2 */}
      {loading === true && <p>Loading artwork...</p>}
      {errors !== null && <p>Error loading artwork.</p>}

      {artworkArray.length > 0 && (
        <div>
          {artworkArray.map((art) => (
            <ArtSlide key={art.id} art={art} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtSlideshow;
