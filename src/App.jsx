import { useState, useEffect } from "react";
import Header from "./components/Header";
import SynaForm from "./components/SYNAForm.jsx";
import ResultsContainer from "./components/ResultsContainer";
import { usePlaylist } from "./hooks/usePlaylist";
import useMuseumArt from "./hooks/useMuseumArt";
import { useSavedExperiences } from "./useSavedExperiences";
import SavedExperiences from "./components/SavedExperiences";

const App = () => {
  const [userInputs, setUserInputs] = useState({
    mood: "",
    artists: [],
    genres: [],
    energy: "",
    occasion: "",
    discovery: 50
  });
  
  const { experiences, saveExperience, deleteExperience } = useSavedExperiences();


  const { data, loading, error } = usePlaylist(userInputs);

  const {
    artworkArray,
    loadingMuseum,
    errorMuseum,
    fetchMuseumArt
  } = useMuseumArt();

  const [playlist, setPlaylist] = useState([]);
  const [dallePrompt, setDallePrompt] = useState("");
  const [coverImageURL, setCoverImageURL] = useState("");
  const [museumArtQueries, setMuseumArtQueries] = useState([]);

  useEffect(() => {
    if (!data) return;

    setPlaylist(data.playlist);
    setDallePrompt(data.dallePrompt);
    setMuseumArtQueries(data.museumArtQueries);
  }, [data]);

  useEffect(() => {
    if (!dallePrompt) return;

    const generateCoverArt = async () => {
      try {
        const response = await fetch("/.netlify/functions/image-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: dallePrompt })
      });

        const result = await response.json();
        setCoverImageURL(result.data?.[0]?.url ?? "");
      } catch (err) {
        console.error("Cover art generation failed:", err);
      }
    };

    generateCoverArt();
  }, [dallePrompt]);

  useEffect(() => {
    if (!data) return;
    if (data.museumArtQueries && data.museumArtQueries.length > 0) {
      fetchMuseumArt(data.museumArtQueries);
    }
  }, [data, fetchMuseumArt]);

  const resetSession = () => {
    setPlaylist([]);
    setDallePrompt("");
    setCoverImageURL("");
    setMuseumArtQueries([]);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee" }}>
        <SavedExperiences experiences={experiences} onDelete={deleteExperience} />
      </aside>

      <main style={{ flex: 1 }}>
        <Header resetSession={resetSession} />

        <SynaForm
          onSubmit={handleSubmit}
          isLoading={loading.gpt || loading.dalle || loading.museum}
        />


        <ResultsContainer
          loading={loading}
          error={error}
          playlist={playlist}
          coverImageURL={coverImageURL}
          museumArtQueries={museumArtQueries}
          artworkArray={artworkArray}
          loadingMuseum={loadingMuseum}
          errorMuseum={errorMuseum}
          saveExperience={saveExperience}
        />
      </main>
    </div>
  );
};

export default App;
