import { useState, useEffect } from "react";
import Header from "./components/Header";
import MoodForm from "./components/MoodForm";
import ResultsContainer from "./components/ResultsContainer";
import { usePlaylist } from "./hooks/usePlaylist";

const App = () => {
  // ----- Mood Inputs (renamed to match Ben's expected shape) -----
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

  // ----- Global State -----
  const [playlist, setPlaylist] = useState([]);
  const [dallePrompt, setDallePrompt] = useState("");
  const [museumArtQueries, setMuseumArtQueries] = useState([]);

  // Phase 2: museum API results
  const [artworkArray, setArtworkArray] = useState([]);

  // Sync GPT output into global state
  useEffect(() => {
    if (!data) return;

    setPlaylist(data.playlist);
    setDallePrompt(data.dallePrompt);
    setMuseumArtQueries(data.museumArtQueries);
  }, [data]);

  // Reset session
  const resetSession = () => {
    setPlaylist([]);
    setDallePrompt("");
    setMuseumArtQueries([]);
    setArtworkArray([]);
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
      />
    </div>
  );
};

export default App;
