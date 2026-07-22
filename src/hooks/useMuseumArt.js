import { useState } from "react";

const useMuseumArt = () => {
  const [artworkArray, setArtworkArray] = useState([]);
  const [loadingMuseum, setLoadingMuseum] = useState(false);
  const [errorMuseum, setErrorMuseum] = useState(null);

  const fetchMuseumArt = async (museumArtQueries) => {
    setLoadingMuseum(true);
    setErrorMuseum(null);

    try {
      const results = [];

      for (const query of museumArtQueries) {
        const { museum, objectId } = query;

        if (museum === "met") {
          const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.primaryImageSmall) {
            results.push(data);
          }
        }

        if (museum === "aic") {
          const url = `https://api.artic.edu/api/v1/artworks/${objectId}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.data?.image_id) {
            results.push(data.data);
        }
      }

      setArtworkArray(results);
    } catch (err) {
      setErrorMuseum(err.message || "Error fetching museum art.");
    } finally {
      setLoadingMuseum(false);
    }
  };

  return { artworkArray, loadingMuseum, errorMuseum, fetchMuseumArt };
};

export default useMuseumArt;
