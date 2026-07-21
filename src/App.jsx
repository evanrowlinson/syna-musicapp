import { useState, useEffect } from "react";
import Header from "./components/Header";
import MoodForm from "./components/MoodForm";
import ResultsContainer from "./components/ResultsContainer";

const App = () => {
  // ----- Mood Inputs -----
  const [moodInputs, setMoodInputs] = useState({
    moodText: "",
    artists: [],
    genres: [],
    energy: "",
    occasion: "",
    discovery: 50,
  });

  // ----- GPT Output-----
  const [playlist, setPlaylist] = useState([]);
  const [dallePrompt, setDallePrompt] = useState(""); 
  const [museumArtQueries, setMuseumArtQueries] = useState([]); 

  // ----- Phase 2: Final museum artwork objects -----
  const [artworkArray, setArtworkArray] = useState([]); 

  // ----- Loading States -----
  const [loading, setLoading] = useState({
    gpt: false,
    dalle: false,
    museum: false,
  });

  // ----- Error States -----
  const [errors, setErrors] = useState({
    gpt: null,
    dalle: null,
    museum: null,
  });

  // ----- Saved Experiences -----
  const [savedExperiences, setSavedExperiences] = useState([]);

  // Load saved experiences on mount
  useEffect(() => {
    const stored = localStorage.getItem("muse_ai_saved");
    if (stored !== null) {
      setSavedExperiences(JSON.parse(stored));
    }
  }, []);

  // Reset current session (not saved experiences)
  const resetSession = () => {
    setPlaylist([]);
    setDallePrompt("");
    setMuseumArtQueries([]);
    setArtworkArray([]);
    setLoading({ gpt: false, dalle: false, museum: false });
    setErrors({ gpt: null, dalle: null, museum: null });
  };

  return (
    <div>
      <Header resetSession={resetSession} />

      <MoodForm 
        moodInputs={moodInputs} 
        setMoodInputs={setMoodInputs} 
        setLoading={setLoading}
        setErrors={setErrors}
        setPlaylist={setPlaylist}
        setDallePrompt={setDallePrompt}
        setMuseumArtQueries={setMuseumArtQueries}
      />

      <ResultsContainer
        loading={loading}
        errors={errors}
        playlist={playlist}
        dallePrompt={dallePrompt}
        museumArtQueries={museumArtQueries}
        artworkArray={artworkArray}
      />
    </div>
  );
};

export default App;
