import React, { useState, useEffect } from "react";
import ArtSlide from "./ArtSlide";

const ArtSlideshow = ({ artworkArray, loadingMuseum, errorMuseum }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!artworkArray || artworkArray.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % artworkArray.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [artworkArray]);

  if (loadingMuseum === true) {
    return <p>Loading museum art...</p>;
  }

  if (errorMuseum !== null) {
    return <p>{errorMuseum}</p>;
  }

  if (!artworkArray || artworkArray.length === 0) {
    return null;
  }

  const current = artworkArray[index];

  return (
    <div className="art-slideshow">
      <ArtSlide art={current} />
      <div className="slideshow-controls">
        <button
          onClick={() =>
            setIndex((prev) =>
              prev === 0 ? artworkArray.length - 1 : prev - 1
            )
          }
        >
          Prev
        </button>
        <button
          onClick={() =>
            setIndex((prev) => (prev + 1) % artworkArray.length)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArtSlideshow;
