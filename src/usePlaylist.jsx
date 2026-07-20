import { useState, useEffect } from 'react';

const SYSTEM_PROMPT = `You are a music and art curation backend engine. Take a user's mood, preferred artists, genre preferences, energy level, and current activity, and generate a cohesive experience.
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
      "searchKeyword": "An exact historical keyword/artist name to query a museum API (e.g., 'Rembrandt')",
      "emotionalContext": "Why this style matches the vibe."
    }
  ]
}`;

const MOCK_AI_RESPONSE = {
  playlist: [
    { id: "track-001", title: "Nightcall", artist: "Kavinsky", justification: "A quintessential synthwave opener with neon-noir menace and a lonely, forward-driving pulse." },
    { id: "track-002", title: "Blinding Lights", artist: "The Weeknd", justification: "Bright, urgent, and emotionally distant, it channels late-night motion with a bittersweet edge." },
    { id: "track-003", title: "After Dark", artist: "Mr.Kitty", justification: "Dreamy and wistful, it keeps the mood melancholic while the beat stays propulsive for the road." },
    { id: "track-004", title: "Midnight City", artist: "M83", justification: "A glowing nocturnal anthem that lifts the energy without losing the reflective, city-at-night feeling." },
    { id: "track-005", title: "Turbo Killer", artist: "Carpenter Brut", justification: "High-octane synth aggression adds adrenaline for the drive while preserving the dark retro palette." },
    { id: "track-006", title: "A Real Hero", artist: "College & Electric Youth", justification: "Tender and cinematic, it provides the emotional core and lingering afterglow of the playlist." }
  ],
  dallePrompt: "Create a cinematic playlist cover art for a synthwave late-night drive, blending neon vaporwave color palettes with Edward Hopper's lonely urban realism...",
  museumArtQueries: [
    { id: "artwork-001", searchKeyword: "Edward Hopper", emotionalContext: "His nocturnal isolation and urban stillness match the lonely, reflective side of a late-night drive." },
    { id: "artwork-002", searchKeyword: "Caspar David Friedrich", emotionalContext: "His Romantic sense of vast atmosphere and inward feeling mirrors the melancholic, searching tone." },
    { id: "artwork-003", searchKeyword: "J. M. W. Turner", emotionalContext: "His luminous motion and stormy color can echo the speed, blur, and emotional charge of synthwave energy." }
  ]
};

function isValidInput(inputs) {
  if (!inputs || typeof inputs !== 'object') return false;
  const hasMood = typeof inputs.mood === 'string' && inputs.mood.trim().length > 0;
  const hasGenre = !inputs.genre || (typeof inputs.genre === 'string' && inputs.genre.trim().length > 0);
  const hasArtists = Array.isArray(inputs.artists) && inputs.artists.length > 0;
  return hasMood && hasGenre && hasArtists;
}

export function usePlaylist(userInputs, options = { useMock: true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInputs) return;

    if (!isValidInput(userInputs)) {
      setError('Please provide a mood, genre, and at least one artist before generating a playlist.');
      setData(null);
      return;
    }

    const fetchPlaylistData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (options.useMock) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setData(MOCK_AI_RESPONSE);
        } else {
          const response = await fetch('/.netlify/functions/chat-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'gpt-5.4-mini',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: JSON.stringify(userInputs) }
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
            throw new Error('No content returned from the AI response.');
          }

          let parsed;
          try {
            parsed = JSON.parse(rawContent);
          } catch {
            throw new Error('AI response was not valid JSON. Try again.');
          }

          if (!parsed.playlist || !parsed.dallePrompt || !parsed.museumArtQueries) {
            throw new Error('AI response is missing required fields.');
          }

          setData(parsed);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, [userInputs, options.useMock]);

  return { data, loading, error };
}