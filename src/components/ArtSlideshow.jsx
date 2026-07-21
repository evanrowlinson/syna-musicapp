import React, { useState, useEffect } from "react";
import ArtSlide from "./ArtSlide";

const ArtSlideshow = ({ artworkArray, loadingMuseum, errorMuseum }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto‑advance every 5 seconds
  useEffect(() => {
    if (artworkArray.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex === artworkArray.length ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [artworkArray]);

  // Manual navigation
  const goNext = () => {
    if (artworkArray.length === 0) return;
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex === artworkArray.length ? 0 : nextIndex;
    });
  };

  const goPrev = () => {
    if (artworkArray.length === 0) return;
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      return nextIndex < 0 ? artworkArray.length - 1 : nextIndex;
    });
  };

  // Loading + Error states
  if (loadingMuseum === true) {
    return <p>Loading artwork...</p>;
  }

  if (errorMuseum !== null) {
    return <p>Error loading artwork.</p>;
  }

  if (artworkArray.length === 0) {
    return <p>No artwork available.</p>;
  }

  return (
    <div className="art-slideshow">
      <button onClick={goPrev} className="nav-button">◀</button>

      <ArtSlide art={artworkArray[currentIndex]} />

      <button onClick={goNext} className="nav-button">▶</button>
    </div>
  );
};

export default ArtSlideshow;
