import { useState, useEffect } from "react";
import Header from "./components/Header"; 
import {ResultsContainer} from "./components/ResultsContainer"; 
import './App.css';
import SYNAForm from './components/SYNAForm';
import useMuseumArt from "./hooks/useMuseumArt";
import usePlaylist from "./hooks/usePlaylist";



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
    if (stored !== null) {
      setSavedExperiences(JSON.parse(stored));
    }
  }, []);

  
const {
  artworkArray,
  loadingMuseum,
  errorMuseum,
  fetchMuseumArt
} = useMuseumArt();

  

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
  onSubmit={handleSubmit}
  isLoading={loading.gpt}
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
