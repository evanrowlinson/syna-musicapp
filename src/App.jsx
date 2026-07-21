import { useState, useEffect } from "react";
import Header from "./components/Header";
import MoodForm from "./components/MoodForm";
import ResultsContainer from "./components/ResultsContainer";
import { usePlaylist } from "./hooks/usePlaylist";
import useMuseumArt from "./hooks/useMuseumArt";

const App = () => {
  // ----- Mood Inputs (Ben's expected shape) -----
  const [userInputs, setUserInputs] = useState({
    mood: "",
    artists: [],
    genres: [],
    energy: "",
    occasion: "",
    discovery: 50
  });

  // ----- GPT Hook -----
  const { data, loading, error } = usePlaylist(userInputs);

  // ----- Museum API Hook -----
  const {
    artworkArray,
    loadingMuseum,
    errorMuseum,
    fetchMuseumArt
  } = useMuseumArt();

  // ----- Global State -----
  const [playlist, setPlaylist] = useState([]);
  const [dallePrompt, setDallePrompt] = useState("");
  const [museumArtQueries, setMuseumArtQueries] = useState([]);

  // Sync GPT output into global state
  useEffect(() => {
    if (!data) return;

    setPlaylist(data.playlist);
    setDallePrompt(data.dallePrompt);
    setMuseumArtQueries(data.museumArtQueries);
  }, [data]);

  // Phase 2: Trigger museum API when GPT returns artworks
  useEffect(() => {
    if (!data) return;
    if (data.artworks) {
      fetchMuseumArt(data.artworks);
    }
  }, [data, fetchMuseumArt]);

  // Reset session
  const resetSession = () => {
    setPlaylist([]);
    setDallePrompt("");
    setMuseumArtQueries([]);
    // museum API state resets automatically inside the hook
  };

  return (
    <div>
      <Header resetSession={resetSession} />

      <MoodForm 
        userInputs={userInputs}
        setUserInputs={setUserInputs}
      />

      <ResultsContainer
        loading={loading}
        error={error}
        playlist={playlist}
        dallePrompt={dallePrompt}
        museumArtQueries={museumArtQueries}
        artworkArray={artworkArray}
        loadingMuseum={loadingMuseum}
        errorMuseum={errorMuseum}
      />
    </div>
  );
};

export default App;
