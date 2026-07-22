import React from "react";

const ArtSlide = ({ art }) => {
  if (!art) return null;

  const image =
    art.primaryImageSmall ||
    art.image_url ||
    art.imageUrl ||
    "";

  return (
    <figure>
      {image && (
        <img
          src={image}
          alt={art.title}
          style={{ width: "250px", borderRadius: "8px" }}
        />
      )}
      <figcaption>
        <div>{art.title}</div>
        <div>{art.artistDisplayName || art.artist_title}</div>
      </figcaption>
    </figure>
  );
};

export default ArtSlide;
