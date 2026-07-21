import { useState } from "react";
import Header from "./components/Header";
import MoodForm from "./components/MoodForm"; // TODO: MoodForm doesn't exist yet — SYNAForm.jsx already covers this (all fields wired, validated)
import ResultsContainer from "./components/ResultsContainer";
import SavedExperiences from './components/SavedExperiences';
import { useSavedExperiences } from './useSavedExperiences';
import './App.css';

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
  // saveExperience isn't called yet — whoever wires up ResultsContainer's "Save Experience"
  // button should call it once a playlist is generated, so it stays in sync with this sidebar.
  const { experiences, deleteExperience } = useSavedExperiences();

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #eee' }}>
        <SavedExperiences experiences={experiences} onDelete={deleteExperience} />
      </aside>

      <main style={{ flex: 1 }}>
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
      </main>
    </div>
  );
};

export default App;
