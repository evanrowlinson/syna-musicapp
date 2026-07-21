import React from "react";

const ArtSlide = ({ art }) => {
  return (
    <div className="art-slide">
      <img 
        src={art.imageUrl} 
        alt={art.title} 
        className="art-image"
      />

      <h3>{art.title}</h3>
      <p><strong>Artist:</strong> {art.artist}</p>
      <p><strong>Period:</strong> {art.period}</p>
      <p><strong>Museum:</strong> {art.museum}</p>

      <p className="art-justification">
        {art.justification}
      </p>
    </div>
  );
};

export default ArtSlide;
