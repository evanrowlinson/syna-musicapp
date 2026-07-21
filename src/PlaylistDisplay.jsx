import React from "react";

const PlaylistDisplay = ({ data, loading, error }) => {
  if (loading === true) {
    return <p>Generating playlist...</p>;
  }

  if (error !== null) {
    return <p>{error}</p>;
  }

  if (!data || !data.playlist || data.playlist.length === 0) {
    return <p>Please submit the form to generate your custom experience.</p>;
  }

  return (
    <ul>
      {data.playlist.map((track) => (
        <li key={track.id}>
          <strong>{track.title}</strong> — {track.artist}
        </li>
      ))}
    </ul>
  );
};

export default PlaylistDisplay;
