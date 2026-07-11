import { useState, useEffect } from "react";
import Form from "./components/Form";
import PlaylistDisplay from "./components/PlaylistDisplay";
import CoverArt from "./components/CoverArt";
import ArtSlideshow from "./components/ArtSlideshow";
import Header from "./components/Header";
import ResultsContainer from "./components/ResultsContainer";

const App = () => {
  // ----- Mood Inputs -----
  const [moodInputs, setMoodInputs] = useState({
    moodText: "",
    artist: "",
    genres: [],
    energy: "",
    occasion: "",
    discovery: 50,
  });

  // ----- GPT Output -----
  const [playlist, setPlaylist] = useState([]);
  const [coverArtUrl, setCoverArtUrl] = useState("");
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
    if (stored) {
      setSavedExperiences(JSON.parse(stored));
    }
  }, []);

  // Reset current session (not saved experiences)
  const resetSession = () => {
    setPlaylist([]);
    setCoverArtUrl("");
    setArtworkArray([]);
    setLoading({ gpt: false, dalle: false, museum: false });
    setErrors({ gpt: null, dalle: null, museum: null });
  };

  return (
    <div>
      <Header resetSession={resetSession} />
      <Form moodInputs={moodInputs} setMoodInputs={setMoodInputs} />
      <ResultsContainer
        loading={loading}
        errors={errors}
        playlist={playlist}
        coverArtUrl={coverArtUrl}
        artworkArray={artworkArray}
      />
    </div>
  );
};

export default App;
