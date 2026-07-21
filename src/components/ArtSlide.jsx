import React from "react";

const ArtSlide = ({ art }) => {
  return (
    <div className="art-slide">
      {/* Placeholder — real UI comes in Phase 2 */}
      <img src={art.imageUrl} alt={art.title} />

      <h3>{art.title}</h3>
      <p>{art.artist}</p>
      <p>{art.period}</p>
      <p>{art.museum}</p>
      <p>{art.justification}</p>
    </div>
  );
};

export default ArtSlide;
