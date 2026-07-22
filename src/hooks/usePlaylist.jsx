import { useState, useEffect } from "react";

const SYSTEM_PROMPT = `You are a music and art curation backend engine. Take a user's mood, anchor artists, preferred genres, energy level, occasion, and discovery preference (how familiar vs. adventurous the picks should be), and generate a cohesive experience.
You must respond ONLY with a single JSON object matching this exact schema:
{
  "playlist": [
    {
      "id": "unique-string-1",
      "title": "Song Title",
      "artist": "Artist Name",
      "justification": "A brief explanation of why this track fits."
    }
  ],
  "dallePrompt": "A detailed descriptive prompt for DALL-E 3 describing a playlist cover art fusing the genre aesthetic with a specific classical visual style matching the mood.",
  "museumArtQueries": [
    {
      "id": "unique-string-2",
      "museum": "met",
      "objectId": 123456,
      "emotionalContext": "Why this style matches the vibe."
    }
  ]
}
Use energy level to influence track tempo/intensity. Use occasion as context for what kind of listening experience this is. Use discovery to decide how well-known vs. obscure the track picks should be — low discovery means stick to familiar/popular songs, high discovery means include more obscure or lesser-known picks.`;

function isValidInput(inputs) {
  if (!inputs || typeof inputs !== "object") return false;
  const hasMood = typeof inputs.mood === "string" && inputs.mood.trim().length > 0;
  const hasArtists = Array.isArray(inputs.artists) && inputs.artists.length > 0;
  return hasMood && hasArtists;
}

export function usePlaylist(userInputs) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInputs) return;

    if (!isValidInput(userInputs)) {
      setData(null);
      setError(null);  // silent return for empty/initial state
      return;
    }

    const fetchPlaylistData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/.netlify/functions/chat-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gpt-5.4-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: JSON.stringify(userInputs) }
            ]
          })
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.error || `Request failed with status ${response.status}`);
        }

        const completion = await response.json();
        const rawContent = completion.choices?.[0]?.message?.content;

        if (!rawContent) {
          throw new Error("No content returned from the AI response.");
        }

        let parsed;
        try {
          parsed = JSON.parse(rawContent);
        } catch {
          throw new Error("AI response was not valid JSON. Try again.");
        }

        if (!parsed.playlist || !parsed.dallePrompt || !parsed.museumArtQueries) {
          throw new Error("AI response is missing required fields.");
        }

        setData(parsed);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, [userInputs]);

  return { data, loading, error };
}
