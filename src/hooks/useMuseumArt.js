import { useState } from "react";

const useMuseumArt = () => {
  const [artworkArray, setArtworkArray] = useState([]);
  const [loadingMuseum, setLoadingMuseum] = useState(false);
  const [errorMuseum, setErrorMuseum] = useState(null);

  // Phase 2: GPT will return full artwork objects with:
  // id, museum, image_id, title, artist, period, justification
  const fetchMuseumArt = async (artworksFromGPT) => {
    setLoadingMuseum(true);
    setErrorMuseum(null);

    try {
      const results = [];

      for (const art of artworksFromGPT) {
        let apiUrl = "";

        // Determine which museum API to call
        if (art.museum === "met") {
          apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${art.id}`;
        } else if (art.museum === "aic") {
          apiUrl = `https://api.artic.edu/api/v1/artworks/${art.id}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Normalize image URL depending on museum source
        let imageUrl = "";

        if (art.museum === "met") {
          imageUrl = data.primaryImage;
        } else if (art.museum === "aic") {
          imageUrl = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;
        }

        results.push({
          id: art.id,
          museum: art.museum,
          title: art.title,
          artist: art.artist,
          period: art.period,
          justification: art.justification,
          imageUrl: imageUrl
        });
      }

      setArtworkArray(results);
    } catch (err) {
      setErrorMuseum("Failed to fetch museum artwork.");
    } finally {
      setLoadingMuseum(false);
    }
  };

  return {
    artworkArray,
    loadingMuseum,
    errorMuseum,
    fetchMuseumArt
  };
};

export default useMuseumArt;
