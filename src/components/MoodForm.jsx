import React from "react";

const MoodForm = ({ userInputs, setUserInputs }) => {
  // Update a single field inside userInputs
  const updateField = (field, value) => {
    setUserInputs((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="mood-form">
      <h2>Describe Your Mood</h2>

      {/* Mood */}
      <label>Mood</label>
      <input
        type="text"
        value={userInputs.mood}
        onChange={(e) => updateField("mood", e.target.value)}
        placeholder="e.g., nostalgic, energetic, calm"
      />

      {/* Artists */}
      <label>Anchor Artists</label>
      <input
        type="text"
        value={userInputs.artists.join(", ")}
        onChange={(e) =>
          updateField(
            "artists",
            e.target.value.split(",").map((a) => a.trim())
          )
        }
        placeholder="e.g., Drake, M83, Taylor Swift"
      />

      {/* Genres */}
      <label>Preferred Genres</label>
      <input
        type="text"
        value={userInputs.genres.join(", ")}
        onChange={(e) =>
          updateField(
            "genres",
            e.target.value.split(",").map((g) => g.trim())
          )
        }
        placeholder="e.g., synthwave, indie pop"
      />

      {/* Energy */}
      <label>Energy Level</label>
      <select
        value={userInputs.energy}
        onChange={(e) => updateField("energy", e.target.value)}
      >
        <option value="">Select energy</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Occasion */}
      <label>Occasion</label>
      <select
        value={userInputs.occasion}
        onChange={(e) => updateField("occasion", e.target.value)}
      >
        <option value="">Select occasion</option>
        <option value="study">Studying</option>
        <option value="drive">Late-night drive</option>
        <option value="party">Party</option>
        <option value="relax">Relaxing</option>
      </select>

      {/* Discovery slider */}
      <label>Discovery Preference: {userInputs.discovery}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={userInputs.discovery}
        onChange={(e) => updateField("discovery", Number(e.target.value))}
      />

      <p className="form-note">
        The playlist will auto‑generate when you update your mood or artists.
      </p>
    </div>
  );
};

export default MoodForm;
