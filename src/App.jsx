import { useState, useEffect } from "react";
import Header from "./components/Header";
import MoodForm from "./components/MoodForm";
import ResultsContainer from "./components/ResultsContainer";
import './App.css';
import SYNAForm from './components/SYNAForm';

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

  // ----- GPT Output -----
  const [playlist, setPlaylist] = useState([]);
  const [dallePrompt, setDallePrompt] = useState(""); // Ben returns dallePrompt
  const [museumArtQueries, setMuseumArtQueries] = useState([]); // temporary Phase 1 structure

  // ----- museum artwork objects -----
  const [artworkArray, setArtworkArray] = useState([]); 
  // Will be populated once GPT returns full artwork objects (id, museum, image_id, etc.)

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
    if (stored) {
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
