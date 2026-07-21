import { useState, useEffect } from "react";
import Header from "./components/Header"; 
import {ResultsContainer} from "./components/ResultsContainer"; 
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

  // -----Front-end connection to generate-proxy.js (serverless funtion) -----
  const handleSubmit = async (mod) => {
    setLoading({gpt: true, dalle: false, museum: false});
    setErrors({ gpt: null, dalle: null, museum: null });

    try {
      // Call GPT to generate playlist and DALL-E prompt
      const gptResponse = await fetch("/.netlify/functions/generate-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({moodInputs}),
      });

      const data = await gptResponse.json();

      setPlaylist(data.playlist || []);
      setDallePrompt(data.dallePrompt || "");
      setMuseumArtQueries(data.museumArtQueries || []);
      setLoading({gpt: false, dalle: false, museum: false});
    } catch (err) {
      console.error("Pipeline error:", err);
      setErrors({
        gpt: "GPT failed",
        dalle: "DALL-E failed",
        museum: "Museum API failed"
      });
      setLoading({gpt: false, dalle: false, museum: false});
    }
  };

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

      <SYNAForm
        moodInputs={moodInputs}
        setMoodInputs={setMoodInputs}
        handleSubmit={handleSubmit}
        loading={loading.gpt}
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
